import React, { useContext, useState } from 'react';
import { render } from "react-dom";
import { Button, Form, Grid, Header, Segment, Message } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';



function Register(props) {
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState({});

  const { onChange, onSubmit, values } = useForm(registerUser, {
    username: '',
    email: '',
    password: '',
    confirmPassword: ''
  });


  const [addUser, { loading }] = useMutation(REGISTER_USER, {
    update(_, {
      data: { register: userData }
    }) {
      context.login(userData);
      props.history.push('/');
    },
    onError(err) {
      setErrors(err.graphQLErrors[0].extensions.exception.errors);
    },
    variables: values
  })

  function registerUser() {
    addUser();
  }




  return (
    <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 500 }}>
        <Header as='h2' color='teal' textAlign='center'>
          {/* <Image src='/logo.png' /> */}
            Sign Up
        </Header>
        <Form size='large' textAlign='left' onSubmit={onSubmit} noValidate className={loading ? 'loading' : ''}>
          <Segment stacked>
            <Form.Input
              // fluid
              textalign="left"
              // label="Username"
              placeholder="Username"
              name="username"
              type="text"
              error={errors.username ? true : false}
              value={values.username}
              onChange={onChange}
            />

            <Form.Input
              // fluid
              // label="Email"
              placeholder="Email"
              name="email"
              type="email"
              error={errors.email ? true : false}
              value={values.email}
              onChange={onChange}
            />

            <Form.Input
              // fluid
              // label="Password"
              placeholder="Password"
              name="password"
              type='password'
              error={errors.password ? true : false}
              value={values.password}
              onChange={onChange}
            />

            <Form.Input
              // fluid
              // label="Confirm Password"
              placeholder="Confirm Password"
              name="confirmPassword"
              type='password'
              error={errors.confirmPassword ? true : false}
              value={values.confirmPassword}
              onChange={onChange}
            />

            <Button color='teal' type="submit" fluid size='large'>
              Sign Up
            </Button>
          </Segment>
        </Form>
        {Object.keys(errors).length > 0 && (
          <div className="ui error message">
            <ul className="list">
              {Object.values(errors).map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        )}
      </Grid.Column>
    </Grid>
  );
}

const REGISTER_USER = gql`
  mutation register(
    $username:String!
    $email:String!
    $password:String!
    $confirmPassword:String!
  ){
    register(
      registerInput:{
        username:$username
        email:$email
        password:$password
        confirmPassword:$confirmPassword
      }
    ){
      id email username createdAt token
    }
  }

`


export default Register;
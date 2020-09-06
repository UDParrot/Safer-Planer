import React, { useContext, useState } from 'react';
import { Button, Form, Grid, Header, Segment } from 'semantic-ui-react'
import { useMutation } from '@apollo/react-hooks'
import gql from 'graphql-tag'

import { AuthContext } from '../context/auth';
import { useForm } from '../util/hooks';

function MyProfile(props) {
  const { user, logout } = useContext(AuthContext);
  const pathname = window.location.pathname;

  const path = pathname === '/' ? 'home' : pathname.substr(1);
  const [activeItem, setActiveItem] = useState(path);

  const handleItemClick = (e, { name }) => setActiveItem(name);

  return (
    <Grid textAlign='center' style={{ height: '50vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 500 }}>
        <Header as='h2' color='teal' textAlign='center'>
          My Profile
        </Header>
        <Form size='large' textAlign='center' style={{ maxWidth: 500 }}>
          <Segment stacked>
            <h3>
              <Form.Input fluid icon='user' iconPosition='left' label='Username' placeholder={user.username} readOnly />
              <Form.Input fluid icon='mail' iconPosition='left' label='Email' placeholder={user.email} readOnly />
            </h3>
          </Segment>
        </Form>
      </Grid.Column>
    </Grid>

  );

}

export default MyProfile;
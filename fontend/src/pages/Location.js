import React from 'react';
import {Grid, Header } from 'semantic-ui-react'
import VisitorFlow from '../components/VisitorFlow';

class Location extends React.Component {

	constructor(props){
		super(props);
		const date = new Date();
  		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const  { address } = this.props.match.params;

		this.state = {
			address: address,
			year: year,
			month: month,
			day: day
		};
	}

	render(){
		return (

    <Grid textAlign='center' style={{ height: '70vh' }} verticalAlign='middle'>
      <Grid.Column style={{ maxWidth: 1500 }}>
        <Header as='h1' color='teal' textAlign='center'>
            {this.state.address}
        </Header>
        <hr/>
        <br/><br/>
        <VisitorFlow year={this.state.year} month={this.state.month} day={this.state.day} address={this.state.address}/>
      </Grid.Column>
    </Grid>
		);
	}
}

export default Location;
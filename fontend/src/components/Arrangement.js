import React, {useContext, Component } from 'react';
import { Menu } from 'semantic-ui-react';
import { useMutation } from "@apollo/react-hooks"
import gql from "graphql-tag"
import { AuthContext } from '../context/auth';

import TimeSelector from "./TimeSelector.js";

const Arrangement = ({location}) => {
  const long = location.long;
  const lait = location.lait;
  const address = location.address;
  var year = 0;
  var month = 0;
  var day = 0;
  var time = 0;
  var dateString = "";
  const { user, logout } = useContext(AuthContext);
  const username = user.username;

  const [makeArr] = useMutation(MAKE_ARRANGEMENT);

  return (
    <div>
      <form onSubmit = {e =>{
        e.preventDefault();
        makeArr({
          variables:{
            username,
            long,
            lait,
            address,
            year,
            month,
            day,
            time
          }});
      }}>
        <input 
        type="date"
        onChange={date=>{
          dateString = date.target.value;
          year = parseInt(dateString[0] + dateString[1] + dateString[2] + dateString[3]);
          month = parseInt(dateString[5] + dateString[6]);
          day = parseInt(dateString[8] + dateString[9]);
        }}/>
        <TimeSelector selectTime={time=>{time = time.target.value; console.log(time)}}></TimeSelector>
        <button type="submit"> Make Arrangement </button>
      </form>
    </div>
  )
}

const MAKE_ARRANGEMENT = gql`
  mutation {
  makeArrangementNoAuth(input:{
    username: "mikews"
    long:"-73.996460"
    lait:"40.729511"
    address:"New York University Tandon"
        year:2020
    month:9
    day:5
    time:21
  }){
    username
    long
    lait
    address
        year
    month
    day
    time
  }
}
`

// const MAKE_ARRANGEMENT = gql`
//   mutation MakeArrangementNoAuth(
//     $username: String,
//     $long: String,
//     $lait: String,
//     $address: String,
//     $year: Int,
//     $month: Int,
//     $day: Int
//     $time: Int,
//   ){
//     makeArrangementNoAuth(
//       username: $username,
//       long: $long,
//       lait: $lait,
//       address: $address,
//       year: $year,
//       month: $month,
//       day: $day,
//       time: $time
//     ){
//     username
//     long
//     lait
//     address
//         year
//     month
//     day
//     time
//   }
// }
// `

export default Arrangement;



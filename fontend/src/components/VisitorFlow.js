import CanvasJSReact from './canvasjs.react';
import React, { Component } from 'react';

import { useQuery } from '@apollo/react-hooks';
import gql from 'graphql-tag';

//var CanvasJSReact = require('./canvasjs.react');
var CanvasJS = CanvasJSReact.CanvasJS;
var CanvasJSChart = CanvasJSReact.CanvasJSChart;
 
const VisitorFlow = ({year, month, day, address}) => {
    const name = address;
    const { loading: longlaitLoading, data: longlaitData } = useQuery(FETCH_LONGLAT_QUERY, {variables: {address: name}});
    var long = "";
    var lait = ""
    let visitorFlow = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    if(!longlaitLoading){
      long = longlaitData.getAddress.long;
      lait = longlaitData.getAddress.lait;
    }

    const { loading: countLoading0, data:countData0 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 0, year: year, month: month, day: day}});
    if(!countLoading0){
      visitorFlow[0] = countData0.getCountOfLocationAtTime;
    }

    const { loading: countLoading1, data:countData1 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 1, year: year, month: month, day: day}});
    if(!countLoading1){
      visitorFlow[1] = countData1.getCountOfLocationAtTime;
    }

    const { loading: countLoading2, data:countData2 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 2, year: year, month: month, day: day}});
    if(!countLoading2){
      visitorFlow[2] = countData2.getCountOfLocationAtTime;
    }

    const { loading: countLoading3, data:countData3 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 3, year: year, month: month, day: day}});
    if(!countLoading3){
      visitorFlow[3] = countData3.getCountOfLocationAtTime;
    }

    const { loading: countLoading4, data:countData4 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 4, year: year, month: month, day: day}});
    if(!countLoading4){
      visitorFlow[4] = countData4.getCountOfLocationAtTime;
    }


    const { loading: countLoading5, data:countData5 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 5, year: year, month: month, day: day}});
    if(!countLoading5){
      visitorFlow[5] = countData5.getCountOfLocationAtTime;
    }

    const { loading: countLoading6, data:countData6 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 6, year: year, month: month, day: day}});
    if(!countLoading6){
      visitorFlow[6] = countData6.getCountOfLocationAtTime;
    }

    const { loading: countLoading7, data:countData7 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 7, year: year, month: month, day: day}});
    if(!countLoading7){
      visitorFlow[7] = countData7.getCountOfLocationAtTime;
    }

    const { loading: countLoading8, data:countData8 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 8, year: year, month: month, day: day}});
    if(!countLoading8){
      visitorFlow[8] = countData8.getCountOfLocationAtTime;
    }

    const { loading: countLoading9, data:countData9 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 9, year: year, month: month, day: day}});
    if(!countLoading9){
      visitorFlow[9] = countData9.getCountOfLocationAtTime;
    }

    const { loading: countLoading10, data:countData10 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 10, year: year, month: month, day: day}});
    if(!countLoading10){
      visitorFlow[10] = countData10.getCountOfLocationAtTime;
    }

    const { loading: countLoading11, data:countData11 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 11, year: year, month: month, day: day}});
    if(!countLoading11){
      visitorFlow[11] = countData11.getCountOfLocationAtTime;
    }

    const { loading: countLoading12, data:countData12 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 12, year: year, month: month, day: day}});
    if(!countLoading12){
      visitorFlow[12] = countData12.getCountOfLocationAtTime;
    }

    const { loading: countLoading13, data:countData13 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 13, year: year, month: month, day: day}});
    if(!countLoading13){
      visitorFlow[13] = countData13.getCountOfLocationAtTime;
    }

    const { loading: countLoading14, data:countData14 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 14, year: year, month: month, day: day}});
    if(!countLoading14){
      visitorFlow[14] = countData14.getCountOfLocationAtTime;
    }

    const { loading: countLoading15, data:countData15 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 15, year: year, month: month, day: day}});
    if(!countLoading15){
      visitorFlow[15] = countData15.getCountOfLocationAtTime;
    }

    const { loading: countLoading16, data:countData16 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 16, year: year, month: month, day: day}});
    if(!countLoading16){
      visitorFlow[16] = countData16.getCountOfLocationAtTime;
    }

    const { loading: countLoading17, data:countData17 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 17, year: year, month: month, day: day}});
    if(!countLoading17){
      visitorFlow[17] = countData17.getCountOfLocationAtTime;
    }

    const { loading: countLoading18, data:countData18 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 18, year: year, month: month, day: day}});
    if(!countLoading18){
      visitorFlow[18] = countData18.getCountOfLocationAtTime;
    }

    const { loading: countLoading19, data:countData19 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 19, year: year, month: month, day: day}});
    if(!countLoading19){
      visitorFlow[19] = countData19.getCountOfLocationAtTime;
    }


    const { loading: countLoading20, data:countData20 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 20, year: year, month: month, day: day}});
    if(!countLoading20){
      visitorFlow[20] = countData20.getCountOfLocationAtTime;
    }

    const { loading: countLoading21, data:countData21 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 21, year: year, month: month, day: day}});
    if(!countLoading21){
      visitorFlow[21] = countData21.getCountOfLocationAtTime;
    }

    const { loading: countLoading22, data:countData22 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 22, year: year, month: month, day: day}});
    if(!countLoading22){
      visitorFlow[22] = countData22.getCountOfLocationAtTime;
    }

    const { loading: countLoading23, data:countData23 } = useQuery(FETCH_POPULATION_QUERY, {variables: 
                                      {long: long, lait: lait, time: 23, year: year, month: month, day: day}});
    if(!countLoading23){
      visitorFlow[23] = countData23.getCountOfLocationAtTime;
    }


    const options = {
      title: {
        text: "Predicted Visitors Flow"
      },
      data: [{				
          type: "column",
          dataPoints: [
              { label: "00:00 - 01:00",  y: visitorFlow[0]  },
              { label: "01:00 - 02:00",  y: visitorFlow[1]  },
              { label: "02:00 - 03:00",  y: visitorFlow[2]  },
              { label: "03:00 - 04:00",  y: visitorFlow[3]  },
              { label: "04:00 - 05:00",  y: visitorFlow[4]  },
              { label: "05:00 - 06:00",  y: visitorFlow[5]  },
              { label: "06:00 - 07:00",  y: visitorFlow[6]  },
              { label: "07:00 - 08:00",  y: visitorFlow[7]  },
              { label: "08:00 - 09:00",  y: visitorFlow[8]  },
              { label: "09:00 - 10:00",  y: visitorFlow[9]  },
              { label: "10:00 - 11:00",  y: visitorFlow[10]  },
              { label: "11:00 - 12:00",  y: visitorFlow[11]  },
              { label: "12:00 - 13:00",  y: visitorFlow[12]  },
              { label: "13:00 - 14:00",  y: visitorFlow[13]  },
              { label: "14:00 - 15:00",  y: visitorFlow[14]  },
              { label: "15:00 - 16:00",  y: visitorFlow[15]  },
              { label: "16:00 - 17:00",  y: visitorFlow[16]  },
              { label: "17:00 - 18:00",  y: visitorFlow[17]  },
              { label: "18:00 - 19:00",  y: visitorFlow[18]  },
              { label: "19:00 - 20:00",  y: visitorFlow[19]  },
              { label: "20:00 - 21:00",  y: visitorFlow[20]  },
              { label: "21:00 - 22:00",  y: visitorFlow[21]  },
              { label: "22:00 - 23:00",  y: visitorFlow[22]  },
              { label: "23:00 - 00:00",  y: visitorFlow[23]  },
          ]
       }]
   }
		
   return (
      <div>
        Current Time : {year} - {month} - {day}
      	<br/><br/>
        <CanvasJSChart options = {options}
        />
      </div>
    )
}

const FETCH_LONGLAT_QUERY = gql `
  query GetAddress($address: String){
    getAddress(address: $address){
      long
      lait
    }
  }
`

const FETCH_POPULATION_QUERY = gql `
  query GetCountOfLocationAtTime($long: String, $lait: String, $time: Int, $year: Int, $month: Int, $day: Int){
    getCountOfLocationAtTime(long: $long, lait: $lait, time: $time, year: $year, month: $month, day: $day)
  }
`

export default VisitorFlow; 
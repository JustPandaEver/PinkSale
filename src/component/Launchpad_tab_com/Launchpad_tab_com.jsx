// import React,{useState} from 'react'
// import copy from "copy-to-clipboard";
// import { Heading, Input1, Input2, Container, Button } from './Styles'

// const Clipboard = () => {
// 	const [copyText, setCopyText] = useState('');

// 	const handleCopyText = (e) => {
// 	setCopyText(e.target.value);
// 	}
	
// 	const copyToClipboard = () => {
// 	copy(copyText);
// 	alert(`You have copied "${copyText}"`);
// 	}
	
// 	return (
// 	<div>
// 		<Heading>GeeksForGeeks</Heading>
		
// 		<Container>
// 		<Input1
// 			type="text"
// 			value={copyText}
// 				onChange={handleCopyText}
// 				placeholder='Enter the text you want to copy' />
	
// 		<Button onClick={copyToClipboard}>
// 			Copy to Clipboard
// 		</Button>
	
// 		<Input2
// 			type="text"
// 			placeholder='Enter the text you have copied' />
// 		</Container>
	
// 	</div>
// 	)
// }

// export default Clipboard;



// import React, { Component } from 'react';
// import Chart from 'react-apexcharts'

// class Donut extends Component {

//   constructor(props) {
//     super(props);

//     this.state = {
//       options: {},
//       series: [44, 55, 41, 17, 15],
//       labels: ['A', 'B', 'C', 'D', 'E']
//     }
//   }

//   render() {

//     return (
//       <div className="donut">
//         <Chart options={this.state.options} series={this.state.series} type="donut" width="380" />
//       </div>
//     );
//   }
// }

// export default Donut;
// import React from "react";
// import { Chart } from "react-google-charts";

// const data = [
//   ["Task", "Hours per Day"],
//   ["Work", 11],
//   ["Eat", 2],
//   ["Commute", 2],
//   ["Watch TV", 2],
//   ["Sleep", 7], // CSS-style declaration
// ];

//  const options = {
//   title: "My Daily Activities",
//   pieHole: 0.4,
//   is3D: false,
// };

// export function Launchpad_tab_com () {
//   return (
//     <Chart
//       chartType="PieChart"
//       width="100%"
//       height="400px"
//       data={data}
//       options={options}
//     />
//   );
// }

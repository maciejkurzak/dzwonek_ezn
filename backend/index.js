const Gpio = require('onoff').Gpio;

const express = require('express')
const app = express()
const port = 5000

// let LED16 = new Gpio(16, 'out');
// let LED20 = new Gpio(20, 'out');
let LED21 = new Gpio(21, 'out');
// let LED26 = new Gpio(26, 'out');

// LED16.writeSync(1);
// LED20.writeSync(1);
LED21.writeSync(1);
// LED26.writeSync(1);

// setInterval(() => {
//   console.log("ON");
//   LED21.writeSync(1);
// }, 2000);

// setTimeout(() => {
//   setInterval(() => {
//     console.log("OFF");
//     LED21.writeSync(0);
//   }, 2000)
// }, 1000)




app.get('/', (req, res) => {
  console.log("elo benc");
  res.send('Hello World!');
})

app.get('/on', (req, res) => {
  console.log("ON");
  res.send('ON');
  LED21.writeSync(1);
})

app.get('/off', (req, res) => {
  console.log("OFF");
  res.send('OFF');
  LED21.writeSync(0);
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
})
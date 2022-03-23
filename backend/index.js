// IMPORTS
// Raspberry GPIO
import Gpio from 'onoff';
const gpio = Gpio.Gpio;

// Web backend
import express from 'express';
const app = express();
const port = 5000;

import cors from 'cors';
import bodyParser from 'body-parser';

// Middleware
app.use(express.json());
app.use(express.urlencoded());
app.use(cors());

// Config
import ringConfig from './config/config.js';




// let LED16 = new gpio(16, 'out');
// let LED20 = new gpio(20, 'out');
let LED21 = new gpio(21, 'out');
// let LED26 = new gpio(26, 'out');

// const ring = () => {
//   LED21.writeSync(1);
//   setTimeout(() => {
//     LED21.writeSync(0);
//   }, 1000)
// }

class Ring {
  constructor(durationName) {
    this.duration = ringConfig[durationName].duration;
  }
  ring(duration) {
    LED21.writeSync(1);
    setTimeout(() => {
      LED21.writeSync(0);
    }, this.duration)
  }
}

const shortRing = new Ring('short');
shortRing.ring();

const longRing = new Ring('long');
longRing.ring();


app.get('/', (req, res) => {
  console.log("elo benc");
  res.send('elo benc');
});

app.get('/api/data', (req, res) => {
  console.log("wysyłam testowe dane");
  res.json({data: Math.round(Math.random() * 100).toString()});
});

app.get('/api/ring/on', (req, res) => {
  console.log("ON");
  LED21.writeSync(1);
  res.send('ON');
});

app.get('/api/ring/off', (req, res) => {
  console.log("OFF");
  LED21.writeSync(0);
  res.send('OFF');
});


app.post('/api/ring', (req, res) => {
  const body = req.body;
  console.log(req.body);
  body.duration === 'short' ? shortRing.ring() : longRing.ring();
  res.sendStatus(201);
})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});


process.on('SIGINT', _ => {
  LED21.unexport();
});
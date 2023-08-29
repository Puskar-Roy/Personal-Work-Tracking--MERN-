const express = require('express');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cors = require('cors');
const router = require('./routes/routes');
const app = express();


const allowedOrigins = [
  "http://localhost:5173"
//   "https://www.thecodebird.in",
];

const corsOptions = {
  origin: function (origin, callback) {
    if (allowedOrigins.includes(origin) || !origin) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};



dotenv.config();
app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
require('./database/connectDb')
app.use('/api',router);




app.listen(process.env.PORT,()=>{
    console.log("Server Start In Port http://localhost:"+process.env.PORT);
})
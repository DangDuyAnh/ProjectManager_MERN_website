// const express = require('express');
// const cors = require('cors');
// const mongoose = require('mongoose');

// const loginRouter = require('./routes/login');
// const projectRouter = require('./routes/project');
// const messageRouter = require('./routes/message');

// require('dotenv').config();

// const app = express();
// const router = require('./router');

// const port = process.env.PORT || 5001;

// app.use(cors());
// app.use(express.json());

// app.use('/login', loginRouter);
// app.use('/project', projectRouter);
// app.use('/message', messageRouter);
// app.use(router);

// const server = app.listen(port, () =>
//   console.log(`Server running on port ${port}`)
// ); 

// const io = require("socket.io").listen(server);

// app.use(function (req, res, next) {
//   req.io = io;
//   next();
// });

// const uri = 'mongodb+srv://admin:a123456@cluster0.tjka1.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';
// mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
// );

// const connection = mongoose.connection;
// connection.once('open', () => {
//   console.log("MongoDB database connection established successfully");
// })

const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
require('dotenv').config();

const loginRouter = require('./routes/login');
const projectRouter = require('./routes/project');
const messageRouter = require('./routes/message');
const assignmentRouter = require('./routes/assignment');
const datkRouter = require('./routes/datk');

const app = express();

// Port that the webserver listens to
const port = process.env.PORT || 5001;

const server = app.listen(port, () =>
  console.log(`Server running on port ${port}`)
);

const io = require("socket.io").listen(server);

// Body Parser middleware to parse request bodies
// app.use(cors());
// app.use(express.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

// CORS middleware
app.use(cors());

// Database configuration
const uri = process.env.DATABASE_URL;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true }
);

const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// Assign socket object to every request
app.use(function (req, res, next) {
  req.io = io;
  next();
});

// Routes
app.use('/login', loginRouter);
app.use('/project', projectRouter);
app.use('/message', messageRouter);
app.use('/assignment', assignmentRouter);
app.use('/datk', datkRouter);
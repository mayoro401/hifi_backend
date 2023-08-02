const express = require('express');
const app  = express();


const cors = require('cors');
var corsOption ={
    origin: 'https://localhost:4200'
};
app.use(cors(corsOption));


app.use(express.json());
app.use(express.urlencoded({extended: true}));

// simple route
app.get("/", (req, res) => {
    res.json({ message: "Welcome to mayoro application." });
  });

port = 8080;
app.listen(port, () => {
    console.log(`Server is running on port ${port}.`);
  });
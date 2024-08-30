// var express = require("express");
// var app = express();
// var path = require("path");
// var mysql = require("mysql2");

// var port = 3000;

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "password",
//   database: "user"
// });

// con.connect(function (err) {
//   if (err) throw err;
//   console.log("Connected!");
// });

// app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname)));
// app.use(express.json());

// app.get("/", function (req, res) {
//   res.sendFile(path.join(__dirname, 'index.html'));
// });

// app.get("/Login", function (req, res) {
//   res.sendFile(path.join(__dirname, 'Login.html'));
// });

// app.get("/user", function (req, res) {
//   con.query(`SELECT * FROM user WHERE name LIKE '%${keyword}%'`, function (err, result, fields) {
//     if (err) throw err;
//     console.log(result);
//     res.render("Login.html", { user: result }
// });

//   app.post("/Login.html", function (req, res) {
//     var keyword = req.body.searchkey;
//     console.log(keyword);
//     con.query(`SELECT * FROM user WHERE name LIKE '%${keyword}%'`, function (err, result, fields) {
//       if (err) throw err;
//       console.log(result);
//       res.render("Login.html", { user: result });
//     });

//     app.listen(port, function () {
//       console.log("Example app listening on port 3000!");
//       console.log("http://localhost:" + port);
//     });


// Import required Node.js modules
const express = require('express');
const mysql = require('mysql2');

// Create a MySQL connection pool
const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'user',
});

// Create a new Express application
const app = express();

// Serve static files from the "public" directory
app.use(express.static(path.join(__filename,''));

// Parse URL-encoded body of POST requests
app.use(express.urlencoded({ extended: true }));

// app.get("/Login", function (req, res) {
//   res.sendFile(path.join(__dirname, 'Login.html'));
// });


// Handle POST requests to the login form
app.post('/login', (req, res) => {
  res.sendFile(path.join(__dirname, 'Login.html'));
  const { username, password } = req.body;

  // Query the database to check if the username and password are valid
  pool.query('SELECT * FROM users WHERE username = ? AND password = ?', [username, password], (err, results) => {
    if (err) {
      console.error(err);
      res.status(500).send('Internal Server Error');
    } else if (results.length > 0) {
      // If the credentials are valid, redirect to the dashboard
      res.redirect('/dashboard');
    } else {
      // If the credentials are invalid, display an error message on the login page
      res.status(401).send('Invalid username or password');
    }
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server started on http://localhost:3000');
});

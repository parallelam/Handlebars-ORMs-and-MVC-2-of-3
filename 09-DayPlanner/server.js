const express = require("express");
const exphbs = require("express-handlebars");
const mysql = require("mysql");
const app = express();

// Set the port of our application
// process.env.PORT lets the port be set by Heroku
const PORT = process.env.PORT || 8080;

// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

const connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  user: "root",
  password: "12345678",
  database: "day_planner_db"
});

connection.connect((err) => {
  if (err) {
    console.error(`Error connecting: ${err.stack}`);
    return;
  }
  console.log(`Connected as id: ${connection.threadId}`);
});

// Use Handlebars to render the main index.html page with the todos in it.
app.get("/", (req, res) => {
  connection.query("SELECT * FROM plans;", (err, data) => {
    if (err) {
      return res.status(500).end();
    }
    res.render("index", { plans: data });
  });
});

// Create a new todo
app.post("/todos", (req, res) => {
  connection.query("INSERT INTO plans (plan) VALUES (?)", [req.body.plan], (err, result) => {
    if (err) {
      return res.status(500).end();
    }
    // Send back the ID of the new todo
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});

// Update a todo
app.put("/todos/:id", (req, res) => {
  connection.query("UPDATE plans SET plan = ? WHERE id = ?", [req.body.plan, req.params.id], (err, result) => {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.changedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Delete a todo
app.delete("/todos/:id", (req, res) => {
  connection.query("DELETE FROM plans WHERE id = ?", [req.params.id], (err, result) => {
    if (err) {
      // If an error occurred, send a generic server failure
      return res.status(500).end();
    }
    else if (result.affectedRows === 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    }
    res.status(200).end();

  });
});

// Start our server so that it can begin listening to client requests.
app.listen(PORT, () => {
  console.log(`Server listening on: http://localhost:${PORT}`);
});

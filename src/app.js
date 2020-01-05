const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();

//set directory where application views can be found - as per pre-created folder structure
//Since app is already in /src don't need to reinclude src
//console.log("dirname is",__dirname);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs"); //embedded javascript engine

//point express to CSS/JS in public - as per pre-created folder structure
//https://expressjs.com/en/starter/static-files.html       //middle-ware !
app.use(express.static(path.join(__dirname, "/public")));

// const accountData = fs.readFileSync('./src/json/accounts.json', "UTF8");
// better practice to fully specify the path and file format
const accountData = fs.readFileSync(
  path.join(__dirname, "json", "accounts.json"),
  "UTF8"
);
const accounts = JSON.parse(accountData);

const userData = fs.readFileSync(
  path.join(__dirname, "json", "users.json"),
  "UTF8"
);
const users = JSON.parse(userData);

//console.log(accounts);

//render index view - created previously
app.get("/", (req, res) => {
  //accounts is already a JSobject
  // res.render("index", { title: "Account Summary", accounts: accounts });
  //shortcut given same key/value
  res.render("index", { title: "Account Summary", accounts});

});

app.get("/profile", (req, res) => {
  res.render("profile", { user: users[0] });
});

app.get("/savings", (req, res) => {
  //be careful with exact "account" spelling here because it's used by ejs for rendering !
  res.render("account", { account: accounts.savings });
});

app.get("/checking", (req, res) => {
  res.render("account", { account: accounts.checking });
});

app.get("/credit", (req, res) => {
  res.render("account", { account: accounts.credit });
});

let port = process.env.PORT || 3000;

app.listen(port, () => console.log(`PS Project Running on port ${port}`));

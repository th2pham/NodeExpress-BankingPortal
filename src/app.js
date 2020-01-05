const fs = require("fs");
const path = require("path");

const express = require("express");

const app = express();
const {accounts, users, writeJSON} = require('./data');

//set directory where application views can be found - as per pre-created folder structure
//Since app is already in /src don't need to reinclude src
//console.log("dirname is",__dirname);
app.set("views", path.join(__dirname, "/views"));
app.set("view engine", "ejs"); //embedded javascript engine

//point express to CSS/JS in public - as per pre-created folder structure
//https://expressjs.com/en/starter/static-files.html       //middle-ware !
app.use(express.static(path.join(__dirname, "/public")));

// for parsing application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// const accountData = fs.readFileSync('./src/json/accounts.json', "UTF8");
// better practice to fully specify the path and file format
// const accountData = fs.readFileSync(
//   path.join(__dirname, "json", "accounts.json"),
//   "UTF8"
// );
// const accounts = JSON.parse(accountData);

// const userData = fs.readFileSync(
//   path.join(__dirname, "json", "users.json"),
//   "UTF8"
// );
// const users = JSON.parse(userData);

//console.log(accounts);

//render index view - created previously
app.get("/", (req, res) => {
  //accounts is already a JSobject
  // res.render("index", { title: "Account Summary", accounts: accounts });
  //shortcut given same key/value
  res.render("index", { title: "Account Summary", accounts });
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

app.get("/transfer", (req, res) => {
  res.render("transfer");
});

app.post("/transfer", (req, res) => {
  const data = req.body;
  //Todo: check for negative, good data, etc.. ?  For the time being, short cut !
  accounts[data.from].balance -= Number(data.amount);
  accounts[data.to].balance += parseInt(data.amount, 10);  //Number doesn't work, trouble shoot later

  // //If we need to break down into 2 steps as per instructions, it'd look like
  // let tmpNewBalance = accounts[data.from].balance;
  // // After some checkings, update tmpNewBalance
  // tmpNewBalance -= data.amount;
  // // Set new balance for FROM acct
  // accounts[data.from].balance = tmpNewBalance;
  // //repeat for ...TO

  // let accountsJSON = JSON.stringify(accounts);
  // fs.writeFileSync(
  //   path.join(__dirname, "json", "accounts.json"),
  //   accountsJSON,
  //   "UTF8"
  // );
  writeJSON();

  res.render("transfer", { message: "Transfer Completed" });
});



app.get("/payment", (req, res) => {
  res.render("payment", {account: accounts.credit});
});

app.post("/payment", (req, res) => {
  const data = req.body;
  //Todo: check for negative, good data, etc.. ?  For the time being, short cut !
  accounts["credit"].balance -= parseInt(data.amount, 10);
  accounts["credit"].available += parseInt(data.amount, 10);

  //Course suggests to use parseInt(), wouldn't this round it off ?

  // let accountsJSON = JSON.stringify(accounts);
  // fs.writeFileSync(
  //   path.join(__dirname, "json", "accounts.json"),
  //   accountsJSON,
  //   "UTF8"
  // );

  writeJSON();


  res.render("payment", { message: "Payment Successful", account: accounts.credit });
});


let port = process.env.PORT || 3000;

app.listen(port, () => console.log(`PS Project Running on port ${port}`));

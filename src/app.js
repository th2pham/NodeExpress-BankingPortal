const fs = require('fs');
const path = require('path');

const express = require('express');

const app = express();

//set directory where application views can be found - as per pre-created folder structure
//Since app is already in /src don't need to reinclude src
//console.log("dirname is",__dirname);
app.set('views', path.join(__dirname, '/views'));
app.set('view engine', 'ejs'); //embedded javascript engine

//point express to CSS/JS in public - as per pre-created folder structure
//https://expressjs.com/en/starter/static-files.html       //middle-ware !
app.use(express.static(path.join(__dirname,'/public')));

//render index view - created previously
app.get('/', (req, res) => {
  res.render('index', { title: 'Index' });
});

let port = process.env.PORT || 3000;

app.listen(port, () => console.log(`PS Project Running on port ${port}`));

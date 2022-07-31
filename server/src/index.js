const express = require('express');
const path = require('path');
const morgan = require('morgan');
const app = express();
let port = process.env.PORT || 8080;
const route = require('./routes');
const db = require('./config/db');
const bodyParser = require('body-parser');
var cors = require('cors')
const methodOverride = require('method-override');
var session = require('express-session');
var cookieParser = require('cookie-parser')

app.use(
    session({
        secret: 'abcdefg',
        resave: true,
        saveUninitialized: true,
        cookie: { maxAge: 2000000000 },
    }),
);
app.use(cookieParser())
//Middleware custom

//connect DB
db.connect();
app.use('/uploads', express.static('uploads'));

app.use(morgan('combined'));

app.set('views', path.join(__dirname, 'resources/views'));
app.use(express.json());

app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use(cors({
    origin: ['http://localhost:3000', 'https://movie-app-cpthinh.netlify.app'],
    credentials:true,
    optionSuccessStatus:200
}))
route(app);
app.use(express.static(path.join(__dirname, 'public')));
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});

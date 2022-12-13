if (process.env.NODE_ENV !== 'production') {
	require('dotenv').config();
}

const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');
const flash = require('express-flash');
const session = require('express-session');
const passport = require('passport');

const sortMiddleware = require('./app/middlewares/SortMiddleware');
const userAuthMiddleware = require('./app/middlewares/UserAuthMiddleware');

const route = require('./routes');
const db = require('./config/db');

db.connect();

const app = express();

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());
app.use(methodOverride('_method'));

app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use(flash());
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false, // we wont resave the session variable if nothing is changed
		saveUninitialized: false,
	}),
);
app.use(passport.initialize());
app.use(passport.session());

//custom middlewares
app.use(sortMiddleware);
app.use(userAuthMiddleware);

app.use(morgan('combined'));

app.engine(
	'hbs',
	handlebars.engine({
		extname: '.hbs',
		helpers: {
			sum: (a, b) => a + b,
		},
	}),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); // set lại path của thư mục views

route(app);

app.listen(process.env.PORT, () => {
	console.log(`App listening on port ${process.env.PORT}`);
});

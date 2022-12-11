const path = require('path');
const express = require('express');
const morgan = require('morgan');
const methodOverride = require('method-override');
const handlebars = require('express-handlebars');

const sortMiddleware = require('./app/middlewares/SortMiddleware');

const route = require('./routes');
const db = require('./config/db');

db.connect();

const app = express();
const port = 3000;

app.use(express.static(path.join(__dirname, 'public')));

app.use(
	express.urlencoded({
		extended: true,
	}),
);
app.use(express.json());
app.use(methodOverride('_method'));

//custom middlewares
app.use(sortMiddleware);

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

app.listen(port, () => {
	console.log(`App listening on port ${port}`);
});

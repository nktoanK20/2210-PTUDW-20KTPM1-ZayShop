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
			paginate: (totalPages, currentPage) => {
				let result = '';
				for (let i = 1; i <= totalPages; i++) {
					if (currentPage === i) {
						result += `<li class="page-item">
                        <a href="#" onclick="inputPageForForm(${i})" class="active page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark">${i}</a>
                		</li>`;
					} else {
						result += `<li class="page-item">
                        <a href=# onclick="inputPageForForm(${i})" class="page-link rounded-0 mr-3 shadow-sm border-top-0 border-left-0 text-dark">${i}</a>
						</li>`;
					}
				}
				return result;
			},
			imgSliderProduct: (imgs) => {
				let result = '';
				let numImgs = 0;
				if (imgs) {
					numImgs = imgs.length;
				}

				let numSliders = Math.ceil(numImgs / 3);
				let imgPerSlider = 3;

				let noImg = 0;
				for (let i = 0; i < numSliders; i++) {
					if (i == 0) {
						result += `<div class="carousel-item active">
						<div class="row">`;

						for (
							let j = 0;
							j < imgPerSlider, noImg < numImgs;
							j++, noImg++
						) {
							result += `<div class="col-4">
							<a href="#">
								<img class="card-img img-fluid" src="${imgs[noImg]}"
									alt="Product Image ${noImg}" />
							</a>
						</div>`;
						}

						result += `</div>
						</div>`;
					} else {
						result += `<div class="carousel-item">
						<div class="row">`;

						for (
							let j = 0;
							j < imgPerSlider, noImg < numImgs;
							j++, noImg++
						) {
							result += `<div class="col-4">
							<a href="#">
								<img class="card-img img-fluid" src="${imgs[noImg]}"
									alt="Product Image ${noImg}" />
							</a>
						</div>`;
						}

						result += `</div>
						</div>`;
					}
				}
				return result;
			},
		},
	}),
);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views')); // set lại path của thư mục views

route(app);

app.listen(process.env.PORT, () => {
	console.log(`App listening on port ${process.env.PORT}`);
});

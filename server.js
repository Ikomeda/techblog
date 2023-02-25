require('dotenv').config();
const path = require('path');
const express = require('express');
const routes = require('./routes');
const session = require('express-session');
const exphbs = require('express-handlebars');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize');

const app = express();
const PORT = process.env.PORT || 3001;
const sess = {
    secret: 'Keep it secret, Keep it SAFE',
    cookie: {
        maxAge: 400000,
        httpOnly: true,
        secure: false,
        sameSite: 'strict',
    },
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
        db: sequelize,
    }),
};

const hbs= exphbs.create({});

app.use(session(sess));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use(routes);

sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log('Now listening!'));
})
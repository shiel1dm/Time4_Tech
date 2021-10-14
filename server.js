const express = require('express');
const session = require('express-session')
const routes = require('./controllers')
const handlebars = require('express-handlebars')

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store)

const app = express();
const PORT = process.env.PORT || 3001;

const sess = {
  secret: 'Super Secret',
  cookie: {},
  resave: false,
  saveUninitialized: true,
  store: new SequelizeStore({
    db: sequelize //connects our Sequalize store to the /config folder.
  })
};

app.use(session(sess));

app.set('view engine', 'handlebars')
app.engine('handlebars', handlebars({
  layoutsDir: __dirname + '/views/layouts'
}))

app.use(express.static('public'))
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(routes);

app.get('/', (req,res) => {
  res.render('signup', {layout : 'index'})
})

sequelize.sync({ force: false }).then(() => {
  app.listen(PORT, () => console.log(`Now listening: http://localhost:${PORT}`))
})
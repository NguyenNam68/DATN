require('dotenv').config();
const express = require('express');
const app = express();
const port = process.env.PORT;
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const hbs = exphbs.create({extname : '.hbs',
            helpers:{
                listproduct: function (value, options){
                    return options.fn(value);
                }
            }
});
const path = require('path');
const route = require('../src/routes');
const bodyparser = require('body-parser');
const cookieParser = require('cookie-parser');

app.use(morgan('combined'));
app.use(express.static(path.join(__dirname, 'public')));

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', path.join(__dirname, 'resources', 'views'));

app.use(bodyparser.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser(process.env.SESSION_SECRET_KEY));

route(app);

app.listen(port, ()=> 
            console.log(`App listening at http://localhost:${port}`
        ));
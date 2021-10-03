const makeApp = require('./app');
const port = (process.env.PORT || 4300);
const database = require('./database');
const app = makeApp(database);
app.listen(port);
const express = require("express");
const json2xls = require('json2xls');
var timeout = require('connect-timeout');

const port = 3333;

/** CREATE APP */
const app = express();
app.use(express.json());
app.use(json2xls.middleware);

/** ROUTES */
const route = require("./routes/api");
app.use("/", route);

app.use(timeout(120000));
app.use(haltOnTimedout);

function haltOnTimedout(req, res, next) {
    if (!req.timedout) next();
}
/** RUN THE SERVER */
app.listen(port, () => console.log(`listening on http://localhost:${port}`));

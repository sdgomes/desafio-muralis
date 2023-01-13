const express = require("express");
const port = 3333;

/** CREATE APP */
const app = express();
app.use(express.json());

/** ROUTES */
const route = require("./routes/api");
app.use("/", route);

/** RUN THE SERVER */
app.listen(port, () => console.log(`listening on http://localhost:${port}`));

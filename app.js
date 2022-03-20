require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT;
const responseMiddleware = require("./api/middlewares/response.middleware");
const api = require("./api/api");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(api);

app.use(responseMiddleware);

app.listen(port, () => console.log(`Server started on port ${port}`));

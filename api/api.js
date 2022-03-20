const ApiResponse = require("./response_models/api_response");
const api = require("express").Router();
const authRouter = require('./routers/auth.router')
const addressRouter = require('./routers/address.router')
const categoryRouter = require('./routers/category.router')
const authMiddleware = require('./middlewares/auth.middleware')

api.get("/", async (req, res, next) => {
  return next(ApiResponse.success());
});

api.use('/auth', authRouter)
api.use('/address', authMiddleware, addressRouter)
api.use('/category', authMiddleware, categoryRouter)

module.exports = api;

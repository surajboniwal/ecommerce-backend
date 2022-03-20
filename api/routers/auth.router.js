const ApiResponse = require("../response_models/api_response");
const ApiError = require("../response_models/api_error");
const auth = require("express").Router();
const bcrypt = require("bcrypt");
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const jwt = require('jsonwebtoken')

auth.post("/register", async (req, res, next) => {
  const { first_name, last_name, email, password } = req.body;

  const password_hash = bcrypt.hashSync(password, 10);

  const user = await client.customer
    .create({
      data: {
        first_name,
        last_name,
        email,
        password_hash,
      },
    })
    .catch((err) => {
      return next(err);
    });

  return next(ApiResponse.created(user));
});


auth.post("/login", async (req, res, next) => {
    const { email, password } = req.body;

    const customer = await client.customer.findUnique({
        where: {
            email
        }
    })

    if(customer === null || customer === undefined){
        return next(ApiError.unauthorized())
    }
  
    const valid =  bcrypt.compareSync(password, customer.password_hash)

    if(!valid){
        return next(ApiError.unauthorized())
    }

    delete customer.password_hash
    delete customer.first_name
    delete customer.last_name

    return next(ApiResponse.success({token: jwt.sign(customer, process.env.JWT_SECRET)}));
  });

module.exports = auth;

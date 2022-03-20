const ApiResponse = require("../response_models/api_response");
const address = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const ApiError = require("../response_models/api_error");
const client = new PrismaClient();

address.get("/", async (req, res, next) => {
  const addresses = await client.address.findMany({
    where: {
      customer_id: req.customer.id,
    },
  });

  return next(ApiResponse.success(addresses));
});

address.post("/", async (req, res, next) => {
  const { address_line1, address_line2, pincode, city, state, country, phone } =
    req.body;

  const address = await client.address.create({
    data: {
      address_line1,
      address_line2,
      city,
      country,
      phone,
      pincode,
      state,
      customer_id: req.customer.id,
    },
  });

  return next(ApiResponse.created(address));
});

address.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  const address = await client.address.delete({
      where:{
          id
      },
  }).catch(err=>{
      return next(ApiError.notFound())
  })

  return next(ApiResponse.accepted(address));
});

module.exports = address;

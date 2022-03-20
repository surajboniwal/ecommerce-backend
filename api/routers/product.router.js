const ApiResponse = require("../response_models/api_response");
const product = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const ApiError = require("../response_models/api_error");
const client = new PrismaClient();
const upload = require('./../helpers/multer')

product.get("/", async (req, res, next) => {
  const { category_id } = req.query;

  const products = await client.product.findMany({
    where: {
      category_id
    },
  });

  return next(ApiResponse.success(products));
});

product.post("/", async (req, res, next) => {
  const { name, slug, description, category_id } = req.body;
  req.body;

  const product = await client.product.create({
    data: {
      name,
      slug,
      description,
      category_id,
    },
  });

  return next(ApiResponse.created(product));
});

product.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  const product = await client.product
    .delete({
      where: {
        id,
      },
    })
    .catch((err) => {
      return next(ApiError.notFound());
    });

  return next(ApiResponse.accepted(product));
});


//:product_id/variant/:product_variant_id/image

module.exports = product;

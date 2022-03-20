const variant = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const client = new PrismaClient();
const ApiResponse = require('./../response_models/api_response')
const upload = require('./../helpers/multer')

variant.get("/", async (req, res, next) => {
  const { product_id } = req.query;

  const variants = await client.productVariant.findMany({
    where: {
      product_id
    },
    select: {
      id: true,
      name: true,
      price: true,
      images: true,
    },
  });

  return next(ApiResponse.success(variants));
});

variant.post("/", async (req, res, next) => {

  const { name, price, product_id } = req.body;

  const variant = await client.productVariant.create({
    data: {
      name,
      price,
      product_id,
    },
  });

  return next(ApiResponse.success(variant));
});


variant.post('/:product_variant_id/image', upload.single('image'), async (req, res, next) => {

    const {product_variant_id} = req.params
  
    const image = await client.productImage.create({
      data: {
        image: req.filename,
        product_variant_id,
      }
    })
  
    return next(ApiResponse.success(image))
  })

module.exports = variant
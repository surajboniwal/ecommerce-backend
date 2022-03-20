const ApiResponse = require("../response_models/api_response");
const category = require("express").Router();
const { PrismaClient } = require("@prisma/client");
const ApiError = require("../response_models/api_error");
const client = new PrismaClient();

category.get("/", async (req, res, next) => {
  const { parent_id = null } = req.query;

  const categories = await client.category.findMany({
    where: {
      parent_id
    },
    select: {
      id: true,
      slug: true,
      name: true,
      featured_image: true,
      active: true,
      _count: true,
      parent_id:true
    },
  });

  return next(ApiResponse.success(categories));
});

category.post("/", async (req, res, next) => {
  const { name, slug, featured_image, parent_id } = req.body;
  req.body;

  const category = await client.category.create({
    data: {
      name,
      slug,
      featured_image,
      parent_id,
    },
  });

  return next(ApiResponse.created(category));
});

category.delete("/:id", async (req, res, next) => {
  const { id } = req.params;

  const category = await client.category
    .delete({
      where: {
        id,
      },
    })
    .catch((err) => {
      return next(ApiError.notFound());
    });

  return next(ApiResponse.accepted(category));
});

module.exports = category;

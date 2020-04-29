const express = require("express");
const router = express.Router();
const itemsController = require("../../controllers/api/items.controller");

const authMiddleware = require("../../middlewares/auth.middleware");

// @route GET api/v1/items
// @desc Get All Items
// @access Public
router.get("/", itemsController.getAll);

// @route POST api/v1/items
// @desc Create an Item
// @access Private
router.post("/", authMiddleware, itemsController.createItem);

// @route DELETE api/v1/items/:id
// @desc Delete an Item
// @access Private
router.delete("/:id", authMiddleware, itemsController.deleteItem);

module.exports = router;

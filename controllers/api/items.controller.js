const Item = require("../../models/Item.model");

exports.getAll = (req, res) => {
  Item.find()
    .sort({ date: -1 })
    .then((items) => {
      res.json(items);
    });
};

exports.createItem = (req, res) => {
  const newItem = new Item({
    name: req.body.name,
  });

  newItem
    .save()
    .then((item) => {
      res.json(item);
    })
    .catch((error) => {
      res.json({
        error: error,
      });
    });
};

exports.deleteItem = (req, res) => {
  Item.findById(req.params.id)
    .then((item) => {
      item
        .remove()
        .then(() => {
          res.json({
            success: true,
          });
        })
        .catch((error) => {
          res.status(404).json({
            success: false,
          });
        });
    })
    .catch((error) => {
      res.json({
        error: error,
      });
    });
};

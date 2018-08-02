const express = require("express");
const router = express.Router();
const actionModel = require("../data/helpers/actionModel");

//* GET Request actionModel get()
router.get("/", (req, res) => {
  actionModel
    .get()
    .then(actions => res.status(200).json(actions))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved." })
    );
});

//* GET with id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  console.log(id);
  actionModel
    .get(id)
    .then(action => {
      if (!action) {
        res.status(404).json({
          message: "The action with the specified ID does not exist."
        });
      } else {
        res.status(200).json(action);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

module.exports = router;

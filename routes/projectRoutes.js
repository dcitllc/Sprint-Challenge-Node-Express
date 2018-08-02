const express = require("express");
const router = express.Router();
const projectModel = require("../data/helpers/projectModel");

//* GET Request projectModel get()
router.get("/", (req, res) => {
  projectModel
    .get()
    .then(actions => res.status(200).json(actions))
    .catch(err =>
      res
        .status(500)
        .json({ error: "The actions information could not be retrieved." })
    );
});

//* GET with id tagDb
router.get("/:id", (req, res) => {
  const { id } = req.params;
  tagDb
    .get(id)
    .then(tag => {
      if (!tag) {
        res
          .status(404)
          .json({ message: "The tag with the specified ID does not exist." });
      } else {
        res.status(200).json(tag);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

module.exports = router;

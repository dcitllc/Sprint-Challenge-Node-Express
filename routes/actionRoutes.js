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

//* POST Request tagDb insert()
router.post("/", (req, res) => {
  if (!req.body.description && !project_id && !notes) {
    return res.status(400).json({
      errorMessage: "Please provide the text for the post."
    });
  }

  actionModel
    .insert({
      description: req.body.description,
      project_id: req.body.project_id,
      notes: req.body.notes
    })
    .then(id => res.status(201).json(id))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the action to the database"
      })
    );
});

module.exports = router;

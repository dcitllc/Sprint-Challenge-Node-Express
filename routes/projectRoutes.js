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

//* GET with id
router.get("/:id", (req, res) => {
  const { id } = req.params;
  projectModel
    .get(id)
    .then(project => {
      if (!project) {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      } else {
        res.status(200).json(project);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The user information could not be retrieved." })
    );
});

//* POST Request insert()
router.post("/", (req, res) => {
  console.log(req.body);
  if (!req.body.project_id || !req.body.description || !req.body.notes) {
    return res.status(400).json({
      errorMessage: "Please provide the text for the post."
    });
  }

  actionModel
    .insert({
      project_id: req.body.project_id,
      description: req.body.description,
      notes: req.body.notes
    })
    .then(id => res.status(201).json(id))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the action to the database"
      })
    );
});

//* UPDATE Request update().
router.put("/:id", (req, res) => {
  const { project_id, description, notes } = req.body;
  const { id } = req.params;

  if (!project_id || !description || !notes) {
    res.status(400).json({
      errorMessage: "Please provide text and user id for the posts."
    });
  }
  actionModel
    .update(id, { project_id, description, notes })
    .then(response => {
      if (!response) {
        res.status(404).json({ message: null });
      } else {
        res.status(200).json({ project_id, description, notes });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be updated" })
    );
});

//* DELETE Request  remove()
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  actionModel
    .remove(id)
    .then(action => {
      if (!action) {
        res.status(404).json({
          message: "The action with the specified ID does not exist."
        });
      } else {
        res.status(200).json({ message: "The action has been deleted." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The action could not be removed" })
    );
});

module.exports = router;

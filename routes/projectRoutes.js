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
  if (!req.body.name || !req.body.description) {
    return res.status(400).json({
      errorMessage: "Please provide the text for the post."
    });
  }

  projectModel
    .insert({
      name: req.body.name,
      description: req.body.description
    })
    .then(id => res.status(201).json(id))
    .catch(err =>
      res.status(500).json({
        error: "There was an error while saving the project to the database"
      })
    );
});

//* UPDATE Request update().
router.put("/:id", (req, res) => {
  const { name, description } = req.body;
  const { id } = req.params;

  if (!name || !description) {
    res.status(400).json({
      errorMessage:
        "Please provide name or description and user id for the posts."
    });
  }
  projectModel
    .update(id, { name, description })
    .then(response => {
      if (!response) {
        res.status(404).json({ message: null });
      } else {
        res.status(200).json({ name, description });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The user could not be updated" })
    );
});

//* DELETE Request  remove()
router.delete("/:id", (req, res) => {
  const { id } = req.params;

  projectModel
    .remove(id)
    .then(project => {
      if (!project) {
        res.status(404).json({
          message: "The project with the specified ID does not exist."
        });
      } else {
        res.status(200).json({ message: "The project has been deleted." });
      }
    })
    .catch(err =>
      res.status(500).json({ error: "The project could not be removed" })
    );
});

module.exports = router;

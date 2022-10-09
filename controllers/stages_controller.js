const stages = require("express").Router();
const db = require("../models");
const { Stage } = db;
const { Op } = require("sequelize");

//Find all stages
stages.get("/", async (req, res) => {
  try {
    const foundStages = await Stage.findAll({
      order: [["name", "ASC"]],
      where: {
        stage_name: {
          [Op.like]: `%${req.query.stage.name ? req.query.stage.name : ""}%`,
        },
      },
    });
    res.status(200).json(foundEvents);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Find an stage
stages.get("/:id", async (req, res) => {
  try {
    const foundStage = await Stage.findOne({
      where: { event_id: req.params.id },
    });
    res.status(200).json(foundStage);
  } catch (error) {
    res.status(500).json(error);
  }
});

//Create an stage
stages.post("/", async (req, res) => {
  try {
    const newStage = await Stage.create(req.body);
    res.status(200).json({
      message: "Succesfully inserted a stage",
      data: newStage,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

//Update an stage
stages.put("/:id", async (req, res) => {
  try {
    const updatedStages = await Stage.destroy({
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully updated ${updatedStages} stage(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE A stage
stages.delete("/:id", async (req, res) => {
  try {
    const deletedStages = await Stage.destroy({
      where: {
        stage_id: req.params.id,
      },
    });
    res.status(200).json({
      message: `Successfully deleted ${deletedStages} event(s)`,
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

// EXPORT
module.exports = stages;

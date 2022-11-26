const router = require("express").Router();
const List = require("../models/List");

router.get("/todolists", async (req, res) => {
  try {
    const todoLists = await List.find();
    res.status(200).json(todoLists);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/todolists", async (req, res) => {
  try {
    await List.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          todos: req.body.todos,
        },
      }
    );
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/addlist", async (req, res) => {
  try {
    const newList = new List({
      title: req.body.title,
    });
    const list = await newList.save();
    res.status(200).json(list._id);
  } catch (error) {
    console.log(error);
  }
});

router.post("/deletelist", async (req, res) => {
  try {
    await List.findOneAndDelete({
      _id: req.body.id,
    });
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post("/renamelist", async (req, res) => {
  try {
    await List.findOneAndUpdate(
      { _id: req.body.id },
      {
        $set: {
          title: req.body.title,
        },
      }
    );
    res.status(200).json();
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;

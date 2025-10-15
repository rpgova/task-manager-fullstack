import express from "express";
import Task from "../models/Task.js";


const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.findAll({ order: [["createdAt", "ASC"]] });
    res.json(tasks);
  } catch (err) { res.status(500).json({ message: err.message }); }
});

// Create new task
router.post("/", async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// Update task
router.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Task.update(req.body, { where: { id } });
    const updated = await Task.findByPk(id);
    res.json(updated);
  } catch (err) { res.status(400).json({ message: err.message }); }
});

// Delete task
router.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    await Task.destroy({ where: { id } });
    res.json({ message: "Task deleted" });
  } catch (err) { res.status(500).json({ message: err.message }); }
});

export default router;

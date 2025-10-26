const express = require('express');
const router = express.Router();
const Task = require('../models/Task');
const protect = require('../middleware/authMiddleware');

// Create Task
router.post('/', protect, async (req,res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json(task);
  } catch(err) {
    res.status(400).json({ message: err.message });
  }
});

// Get all tasks
router.get('/', protect, async (req,res) => {
  const tasks = await Task.find().populate('employee');
  res.json(tasks);
});

// Get task by ID
router.get('/:id', protect, async (req,res) => {
  const task = await Task.findById(req.params.id).populate('employee');
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
});


router.put('/:id', protect, async (req,res) => {
  const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(task);
});


router.delete('/:id', protect, async (req,res) => {
  await Task.findByIdAndDelete(req.params.id);
  res.json({ message: 'Task deleted' });
});

module.exports = router;

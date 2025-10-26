const express = require('express');
const Employee = require('../models/Employee');
const protect = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/', protect, async (req, res) => {
  const { name, position, salary } = req.body;
  try {
    const emp = await Employee.create({ name, position, salary, createdBy: req.user });
    res.json(emp);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/', protect, async (req, res) => {
  const list = await Employee.find({ createdBy: req.user });
  res.json(list);
});

router.put('/:id', protect, async (req, res) => {
  const emp = await Employee.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(emp);
});


router.delete('/:id', protect, async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: 'Employee deleted' });
});

module.exports = router;

const express = require('express');
const Task = require('../models/Task');
const Project = require('../models/Project');
const { protect } = require('../middleware/authMiddleware');

const router = express.Router();

// @route   GET /api/dashboard/stats
// @desc    Get dashboard statistics
// @access  Private
router.get('/stats', protect, async (req, res) => {
  try {
    let stats = {
      totalTasks: 0,
      completedTasks: 0,
      pendingTasks: 0,
      inProgressTasks: 0,
      totalProjects: 0
    };

    if (req.user.role === 'Admin') {
      stats.totalProjects = await Project.countDocuments();
      stats.totalTasks = await Task.countDocuments();
      stats.completedTasks = await Task.countDocuments({ status: 'Completed' });
      stats.pendingTasks = await Task.countDocuments({ status: 'Todo' });
      stats.inProgressTasks = await Task.countDocuments({ status: 'In Progress' });
    } else {
      stats.totalProjects = await Project.countDocuments({ members: req.user._id });
      stats.totalTasks = await Task.countDocuments({ assignedTo: req.user._id });
      stats.completedTasks = await Task.countDocuments({ assignedTo: req.user._id, status: 'Completed' });
      stats.pendingTasks = await Task.countDocuments({ assignedTo: req.user._id, status: 'Todo' });
      stats.inProgressTasks = await Task.countDocuments({ assignedTo: req.user._id, status: 'In Progress' });
    }

    res.json(stats);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;

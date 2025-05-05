const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const Employee = require('../models/Employee');
const { auth } = require('../middleware/auth');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/');
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png/;
    const mimetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());

    if (mimetype && extname) {
      return cb(null, true);
    }
    cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
  }
});

// Get all employees
router.get('/', auth, async (req, res) => {
  try {
    const employees = await Employee.find().sort({ createdAt: -1 });
    res.json(employees);
  } catch (error) {
    console.error('Error fetching employees:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Search employees
router.get('/search', auth, async (req, res) => {
  try {
    const { query } = req.query;
    const employees = await Employee.find(
      { $text: { $search: query } },
      { score: { $meta: 'textScore' } }
    ).sort({ score: { $meta: 'textScore' } });
    res.json(employees);
  } catch (error) {
    res.status(500).json({ error: 'Server error' });
  }
});

// Get single employee
router.get('/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json(employee);
  } catch (error) {
    console.error('Error fetching employee:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Create employee
router.post('/', auth, upload.single('profilePicture'), async (req, res) => {
  try {
    // Log the received data
    console.log('Request body:', req.body);
    console.log('Request file:', req.file);

    // Create employee data object
    const employeeData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      employeeType: req.body.employeeType,
      profilePicture: req.file ? `/uploads/${req.file.filename}` : ''
    };

    // Log the employee data
    console.log('Employee data to save:', employeeData);

    // Create and save the employee
    const employee = new Employee(employeeData);
    const savedEmployee = await employee.save();
    
    console.log('Saved employee:', savedEmployee);
    res.status(201).json(savedEmployee);
  } catch (error) {
    console.error('Error creating employee:', error);
    // Send detailed error message
    res.status(500).json({ 
      error: 'Failed to create employee',
      message: error.message,
      details: error.errors || error
    });
  }
});

// Update employee
router.put('/:id', auth, upload.single('profilePicture'), async (req, res) => {
  try {
    console.log('Update request body:', req.body);
    console.log('Update request file:', req.file);

    // Create employee data object
    const employeeData = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      employeeType: req.body.employeeType
    };

    // Add profile picture if new one is uploaded
    if (req.file) {
      employeeData.profilePicture = `/uploads/${req.file.filename}`;
    }

    console.log('Employee data to update:', employeeData);

    // Find and update the employee
    const employee = await Employee.findByIdAndUpdate(
      req.params.id,
      employeeData,
      { new: true, runValidators: true }
    );

    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    console.log('Updated employee:', employee);
    res.json(employee);
  } catch (error) {
    console.error('Error updating employee:', error);
    res.status(500).json({ 
      error: 'Failed to update employee',
      message: error.message,
      details: error.errors || error
    });
  }
});

// Delete employee
router.delete('/:id', auth, async (req, res) => {
  try {
    const employee = await Employee.findByIdAndDelete(req.params.id);
    if (!employee) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.json({ message: 'Employee deleted successfully' });
  } catch (error) {
    console.error('Error deleting employee:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router; 
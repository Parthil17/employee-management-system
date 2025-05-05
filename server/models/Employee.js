const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true
  },
  employeeType: {
    type: String,
    required: true,
    enum: ['Full Time', 'Part Time', 'Intern']
  },
  profilePicture: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

// Create text index for search functionality
employeeSchema.index({ 
  firstName: 'text', 
  lastName: 'text', 
  email: 'text'
});

const Employee = mongoose.model('Employee', employeeSchema);

module.exports = Employee; 
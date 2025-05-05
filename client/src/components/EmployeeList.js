import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TextField,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  Box
} from '@mui/material';
import {
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Add as AddIcon
} from '@mui/icons-material';
import axios from 'axios';
import EmployeeForm from './EmployeeForm';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmployee, setSelectedEmployee] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [viewEmployee, setViewEmployee] = useState(null);

  const fetchEmployees = async () => {
    try {
      const response = await axios.get('http://localhost:5000/api/employees');
      setEmployees(response.data);
    } catch (error) {
      console.error('Error fetching employees:', error);
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleSearch = async () => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees/search?query=${searchQuery}`);
      setEmployees(response.data);
    } catch (error) {
      console.error('Error searching employees:', error);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this employee?')) {
      try {
        await axios.delete(`http://localhost:5000/api/employees/${id}`);
        fetchEmployees();
      } catch (error) {
        console.error('Error deleting employee:', error);
      }
    }
  };

  const handleEdit = (employee) => {
    setSelectedEmployee(employee);
    setOpenDialog(true);
  };

  const handleView = async (id) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/employees/${id}`);
      setViewEmployee(response.data);
      setOpenViewDialog(true);
    } catch (error) {
      console.error('Error fetching employee details:', error);
    }
  };

  const handleClose = () => {
    setOpenDialog(false);
    setSelectedEmployee(null);
  };

  const handleCloseView = () => {
    setOpenViewDialog(false);
    setViewEmployee(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (selectedEmployee) {
        await axios.put(`http://localhost:5000/api/employees/${selectedEmployee._id}`, formData);
      } else {
        await axios.post('http://localhost:5000/api/employees', formData);
      }
      handleClose();
      fetchEmployees();
    } catch (error) {
      console.error('Error saving employee:', error);
    }
  };

  return (
    <Container>
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
          <TextField
            label="Search Employees"
            variant="outlined"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
            sx={{ width: '300px' }}
          />
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => setOpenDialog(true)}
          >
            Add Employee
          </Button>
        </Box>

        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Position</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee._id}>
                  <TableCell>{`${employee.firstName} ${employee.lastName}`}</TableCell>
                  <TableCell>{employee.email}</TableCell>
                  <TableCell>{employee.position}</TableCell>
                  <TableCell>{employee.department}</TableCell>
                  <TableCell>{employee.employeeType}</TableCell>
                  <TableCell>
                    <IconButton onClick={() => handleView(employee._id)}>
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton onClick={() => handleEdit(employee)}>
                      <EditIcon />
                    </IconButton>
                    <IconButton onClick={() => handleDelete(employee._id)}>
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Box>

      <Dialog open={openDialog} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {selectedEmployee ? 'Edit Employee' : 'Add New Employee'}
        </DialogTitle>
        <DialogContent>
          <EmployeeForm
            employee={selectedEmployee}
            onSubmit={handleSubmit}
            onCancel={handleClose}
          />
        </DialogContent>
      </Dialog>

      <Dialog open={openViewDialog} onClose={handleCloseView} maxWidth="md" fullWidth>
        <DialogTitle>Employee Details</DialogTitle>
        <DialogContent>
          {viewEmployee && (
            <Box sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom>
                {`${viewEmployee.firstName} ${viewEmployee.lastName}`}
              </Typography>
              <Typography>Email: {viewEmployee.email}</Typography>
              <Typography>Phone: {viewEmployee.phone}</Typography>
              <Typography>Position: {viewEmployee.position}</Typography>
              <Typography>Department: {viewEmployee.department}</Typography>
              <Typography>Employee Type: {viewEmployee.employeeType}</Typography>
              <Typography>Joining Date: {new Date(viewEmployee.joiningDate).toLocaleDateString()}</Typography>
              <Typography>Salary: ${viewEmployee.salary}</Typography>
              <Typography>Status: {viewEmployee.status}</Typography>
              {viewEmployee.profilePicture && (
                <Box sx={{ mt: 2 }}>
                  <img
                    src={`http://localhost:5000/${viewEmployee.profilePicture}`}
                    alt="Profile"
                    style={{ maxWidth: '200px' }}
                  />
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseView}>Close</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default EmployeeList; 
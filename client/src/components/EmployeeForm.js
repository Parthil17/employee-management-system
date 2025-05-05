import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Grid,
  TextField,
  Button,
  MenuItem,
  Box,
  Typography
} from '@mui/material';

const validationSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  email: yup.string().email('Enter a valid email').required('Email is required'),
  phone: yup.string().required('Phone number is required'),
  position: yup.string().required('Position is required'),
  department: yup.string().required('Department is required'),
  employeeType: yup.string().required('Employee type is required'),
  joiningDate: yup.date().required('Joining date is required'),
  salary: yup.number().required('Salary is required').min(0, 'Salary must be positive'),
  status: yup.string().required('Status is required'),
  address: yup.object({
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
    state: yup.string().required('State is required'),
    zipCode: yup.string().required('Zip code is required'),
    country: yup.string().required('Country is required'),
  }),
});

const EmployeeForm = ({ employee, onSubmit, onCancel }) => {
  const [profilePicture, setProfilePicture] = useState(null);

  const formik = useFormik({
    initialValues: {
      firstName: employee?.firstName || '',
      lastName: employee?.lastName || '',
      email: employee?.email || '',
      phone: employee?.phone || '',
      position: employee?.position || '',
      department: employee?.department || '',
      employeeType: employee?.employeeType || '',
      joiningDate: employee?.joiningDate ? new Date(employee.joiningDate).toISOString().split('T')[0] : '',
      salary: employee?.salary || '',
      status: employee?.status || 'Active',
      address: {
        street: employee?.address?.street || '',
        city: employee?.address?.city || '',
        state: employee?.address?.state || '',
        zipCode: employee?.address?.zipCode || '',
        country: employee?.address?.country || '',
      },
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const formData = new FormData();
      Object.keys(values).forEach(key => {
        if (key === 'address') {
          formData.append(key, JSON.stringify(values[key]));
        } else {
          formData.append(key, values[key]);
        }
      });
      if (profilePicture) {
        formData.append('profilePicture', profilePicture);
      }
      onSubmit(formData);
    },
  });

  const handleFileChange = (event) => {
    setProfilePicture(event.target.files[0]);
  };

  return (
    <Box component="form" onSubmit={formik.handleSubmit} sx={{ p: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="firstName"
            label="First Name"
            value={formik.values.firstName}
            onChange={formik.handleChange}
            error={formik.touched.firstName && Boolean(formik.errors.firstName)}
            helperText={formik.touched.firstName && formik.errors.firstName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="lastName"
            label="Last Name"
            value={formik.values.lastName}
            onChange={formik.handleChange}
            error={formik.touched.lastName && Boolean(formik.errors.lastName)}
            helperText={formik.touched.lastName && formik.errors.lastName}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="email"
            label="Email"
            value={formik.values.email}
            onChange={formik.handleChange}
            error={formik.touched.email && Boolean(formik.errors.email)}
            helperText={formik.touched.email && formik.errors.email}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="phone"
            label="Phone"
            value={formik.values.phone}
            onChange={formik.handleChange}
            error={formik.touched.phone && Boolean(formik.errors.phone)}
            helperText={formik.touched.phone && formik.errors.phone}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="position"
            label="Position"
            value={formik.values.position}
            onChange={formik.handleChange}
            error={formik.touched.position && Boolean(formik.errors.position)}
            helperText={formik.touched.position && formik.errors.position}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="department"
            label="Department"
            value={formik.values.department}
            onChange={formik.handleChange}
            error={formik.touched.department && Boolean(formik.errors.department)}
            helperText={formik.touched.department && formik.errors.department}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            name="employeeType"
            label="Employee Type"
            value={formik.values.employeeType}
            onChange={formik.handleChange}
            error={formik.touched.employeeType && Boolean(formik.errors.employeeType)}
            helperText={formik.touched.employeeType && formik.errors.employeeType}
          >
            {['Full-time', 'Part-time', 'Contract', 'Intern'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="date"
            name="joiningDate"
            label="Joining Date"
            value={formik.values.joiningDate}
            onChange={formik.handleChange}
            error={formik.touched.joiningDate && Boolean(formik.errors.joiningDate)}
            helperText={formik.touched.joiningDate && formik.errors.joiningDate}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            type="number"
            name="salary"
            label="Salary"
            value={formik.values.salary}
            onChange={formik.handleChange}
            error={formik.touched.salary && Boolean(formik.errors.salary)}
            helperText={formik.touched.salary && formik.errors.salary}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            select
            name="status"
            label="Status"
            value={formik.values.status}
            onChange={formik.handleChange}
            error={formik.touched.status && Boolean(formik.errors.status)}
            helperText={formik.touched.status && formik.errors.status}
          >
            {['Active', 'Inactive', 'On Leave'].map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6" gutterBottom>
            Address
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
            name="address.street"
            label="Street"
            value={formik.values.address.street}
            onChange={formik.handleChange}
            error={formik.touched.address?.street && Boolean(formik.errors.address?.street)}
            helperText={formik.touched.address?.street && formik.errors.address?.street}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="address.city"
            label="City"
            value={formik.values.address.city}
            onChange={formik.handleChange}
            error={formik.touched.address?.city && Boolean(formik.errors.address?.city)}
            helperText={formik.touched.address?.city && formik.errors.address?.city}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="address.state"
            label="State"
            value={formik.values.address.state}
            onChange={formik.handleChange}
            error={formik.touched.address?.state && Boolean(formik.errors.address?.state)}
            helperText={formik.touched.address?.state && formik.errors.address?.state}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="address.zipCode"
            label="Zip Code"
            value={formik.values.address.zipCode}
            onChange={formik.handleChange}
            error={formik.touched.address?.zipCode && Boolean(formik.errors.address?.zipCode)}
            helperText={formik.touched.address?.zipCode && formik.errors.address?.zipCode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            fullWidth
            name="address.country"
            label="Country"
            value={formik.values.address.country}
            onChange={formik.handleChange}
            error={formik.touched.address?.country && Boolean(formik.errors.address?.country)}
            helperText={formik.touched.address?.country && formik.errors.address?.country}
          />
        </Grid>
        <Grid item xs={12}>
          <input
            accept="image/*"
            type="file"
            id="profilePicture"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          <label htmlFor="profilePicture">
            <Button variant="outlined" component="span">
              Upload Profile Picture
            </Button>
          </label>
          {profilePicture && (
            <Typography variant="body2" sx={{ mt: 1 }}>
              Selected file: {profilePicture.name}
            </Typography>
          )}
        </Grid>
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
            <Button variant="outlined" onClick={onCancel}>
              Cancel
            </Button>
            <Button variant="contained" type="submit">
              {employee ? 'Update' : 'Create'}
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default EmployeeForm; 
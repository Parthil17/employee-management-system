import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Box,
  Card,
  CardContent,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Divider
} from '@mui/material';
import { employeeService } from '../services/api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [stats, setStats] = useState({
    totalEmployees: 0,
    employeeTypes: {},
    recentEmployees: []
  });

  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const employees = await employeeService.getAllEmployees();
        
        // Calculate employee type distribution
        const typeDistribution = employees.reduce((acc, emp) => {
          acc[emp.employeeType] = (acc[emp.employeeType] || 0) + 1;
          return acc;
        }, {});

        // Get recent employees (last 5)
        const recentEmployees = employees
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
          .slice(0, 5);

        setStats({
          totalEmployees: employees.length,
          employeeTypes: typeDistribution,
          recentEmployees
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
      }
    };

    fetchDashboardData();
  }, []);

  return (
    <Box>
      <Navbar />
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Dashboard
        </Typography>

        <Grid container spacing={3}>
          {/* Total Employees Card */}
          <Grid item xs={12} md={4}>
            <Paper
              sx={{
                p: 2,
                display: 'flex',
                flexDirection: 'column',
                height: 140,
                bgcolor: 'primary.main',
                color: 'white'
              }}
            >
              <Typography component="h2" variant="h6" gutterBottom>
                Total Employees
              </Typography>
              <Typography component="p" variant="h4">
                {stats.totalEmployees}
              </Typography>
            </Paper>
          </Grid>

          {/* Employee Type Distribution Card */}
          <Grid item xs={12} md={8}>
            <Paper 
              sx={{ 
                p: 3,
                display: 'flex',
                flexDirection: 'column',
                minHeight: 200
              }}
            >
              <Typography component="h2" variant="h6" gutterBottom sx={{ mb: 2 }}>
                Employee Type Distribution
              </Typography>
              <Grid container spacing={2}>
                {Object.entries(stats.employeeTypes).map(([type, count]) => (
                  <Grid item xs={12} sm={6} md={3} key={type}>
                    <Card 
                      sx={{ 
                        height: '100%',
                        boxShadow: 1
                      }}
                    >
                      <CardContent sx={{ 
                        display: 'flex', 
                        flexDirection: 'column',
                        alignItems: 'center',
                        textAlign: 'center',
                        p: 2
                      }}>
                        <Typography 
                          variant="h4" 
                          component="div" 
                          sx={{ 
                            fontWeight: 'bold',
                            color: 'primary.main',
                            mb: 1
                          }}
                        >
                          {count}
                        </Typography>
                        <Typography 
                          color="text.secondary"
                          sx={{
                            fontSize: '1rem',
                            fontWeight: 500
                          }}
                        >
                          {type}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>

          {/* Recent Employees Card */}
          <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
              <Typography component="h2" variant="h6" gutterBottom>
                Recent Employees
              </Typography>
              <List>
                {stats.recentEmployees.map((employee, index) => (
                  <React.Fragment key={employee._id}>
                    <ListItem>
                      <ListItemAvatar>
                        <Avatar src={employee.profilePicture} alt={`${employee.firstName} ${employee.lastName}`} />
                      </ListItemAvatar>
                      <ListItemText
                        primary={`${employee.firstName} ${employee.lastName}`}
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.primary">
                              {employee.email}
                            </Typography>
                            {' — '}
                            {employee.employeeType}
                          </>
                        }
                      />
                    </ListItem>
                    {index < stats.recentEmployees.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Dashboard; 
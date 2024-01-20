import React from 'react';
import List from '@mui/material/List';
import ErrorIcon from '@mui/icons-material/Error';
import { Paper } from '@mui/material';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Title from '../Title';


export default function AlertList({ alerts }) {
  return (
    <React.Fragment>
      <Title style={{ position: 'sticky' }}>Grid Alerts</Title>
      <Paper
        sx={{
          height: 200,
          overflow: 'auto',
        }}
      >
        <List>
          {alerts
            ?.map(alert => (
              <ListItemButton>
                <ListItemIcon>
                  <ErrorIcon />
                </ListItemIcon>
                <ListItemText primary={alert} />
              </ListItemButton>
            ))}
        </List>
      </Paper>
    </React.Fragment>
  );
}

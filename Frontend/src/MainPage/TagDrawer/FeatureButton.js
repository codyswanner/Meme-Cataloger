import React from 'react';
import {ListItemButton, ListItemText } from '@mui/material';

export default function FeatureButton(props) {

  return (
    <ListItemButton key={props.name} onClick={() => props.action()}>
      {props.startIcon}
      <ListItemText 
        primary={props.name}
        primaryTypographyProps={{
          fontSize: {'xs': 40, 'md': 25},
          marginLeft: "2%"
        }}
      />
    </ListItemButton>
  );
};

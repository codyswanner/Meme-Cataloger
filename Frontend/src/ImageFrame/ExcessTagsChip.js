import React from 'react';
import { ThemeProvider, alpha, createTheme } from '@mui/material/styles';
import Chip from '@mui/material/Chip'


function ExcessTagsLabel(props) {
    const chipLabelStyle = {
      padding: 0,
      color: '#ffffff'
    };
  
    return (
      <p style={chipLabelStyle}>
        +{props.labelText}
      </p>
    );
}


function ExcessTagsChip(props) {
    // Custom coloring to improve tag readability on top of the images
    const chipTheme = createTheme({
        palette: {
          primary: {
            main: alpha('#333333', 0.6),
          },
        }
    });
  
    return (
    <ThemeProvider theme={chipTheme}>
        <Chip color='primary' label={<ExcessTagsLabel labelText={props.labelText}/>}/>
    </ThemeProvider>
    );
}

export default ExcessTagsChip;

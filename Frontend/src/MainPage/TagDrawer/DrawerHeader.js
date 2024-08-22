import React from 'react';
import { IconButton, Toolbar, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';


export default function DrawerHeader(props) {

    return(
        <Toolbar sx={{ marginTop: {'xs': "5%", 'md': 0}}}>
            <Typography
                sx={{ fontSize: {'xs': 40, 'md': 25} }}>
                Filter by Tag
            </Typography>
            <IconButton
                onClick={props.handleEdit}
                role='switch'
                sx={{
                    marginLeft: 'auto',
                    transform: {'xs': 'scale(1.7)', 'md': 'scale(1.15)'}
                }}>
                <EditIcon/>
            </IconButton>
        </Toolbar>
    );
};

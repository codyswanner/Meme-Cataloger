import React from 'react';
import { Drawer, Toolbar } from '@mui/material';

import DrawerContents from './DrawerContents';


/**
 * LeftDrawer contains checkboxes to select tags for image filtering.
 * 
 * @returns The LeftDrawer component to be rendered in the app.
 */
function LeftDrawer(props) {
    const drawerWidth = 240;

    const handleDrawerClose = () => {
        setIsClosingDrawer(true);
        setDrawerOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        props.setIsClosingDrawer(false);
    };
    
    return (
        <>
        {/* Permanent-style drawer for large screens -- hides on small screens */}
        <Drawer
            variant='permanent'
            sx={{
                backgroundColor: '#666666',
                width: drawerWidth,
                flexShrink: 0,
                ['& .MuiDrawer-paper']: { width: drawerWidth, backgroundColor: '#aaaaaa' },
                marginRight: '0.5%',
                display: { xs: 'none', md: 'block' }
            }}>
            <Toolbar/> {/* Empty toolbar hides under fixed position AppBar, pushes elements into visible space */}
            <DrawerContents />
        </Drawer>

        {/* Temporary/hidable drawer for small screens -- hides on large screens */}
        <Drawer
            variant='temporary'
            open={props.drawerOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                backgroundColor: '#666666',
                width: '100%',
                flexShrink: 0,
                ['& .MuiDrawer-paper']: { width: '100%', backgroundColor: '#aaaaaa' },
                marginRight: '0.5%',
                display: { xs: 'block', md: 'none' }  }}
        >
            <Toolbar sx={{ height: '6.5em' }}/> {/* Empty toolbar hides under fixed position AppBar, pushes elements into visible space */}
            <DrawerContents/>
        </Drawer>
        </>
    );
};

export default LeftDrawer;

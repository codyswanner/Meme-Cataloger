import React from 'react';
import { Drawer, Toolbar } from '@mui/material';

import DrawerModeSwitcher from './DrawerModeSwitcher';


/**
 * LeftDrawer contains checkboxes to select tags for image filtering.
 * 
 * @returns The LeftDrawer component to be rendered in the app.
 */
function LeftDrawer(props) {

    const drawerStyles = (style) => {
        const widthChooser = style=='permanent' ? 240: "100%"
        return {
            backgroundColor: '#666666',
            width: widthChooser,
            flexShrink: 0,
            ['& .MuiDrawer-paper']:
                { width: widthChooser, backgroundColor: '#aaaaaa' },
            marginRight: '0.5%',
        };
    };

    const handleDrawerClose = () => {
        setIsClosingDrawer(true);
        setDrawerOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        props.setIsClosingDrawer(false);
    };
    
    return (
        <>
        {/* Permanent drawer for large screens -- hides on small screens */}
        <Drawer
            variant='permanent'
            sx={[drawerStyles('permanent'), {display: { xs: 'none', md: 'block' }}]}>
            <Toolbar/> {/* Hides under AppBar, push below into open space */}
            <DrawerModeSwitcher />
        </Drawer>

        {/* Hidable drawer for small screens -- hides on large screens */}
        <Drawer
            variant='temporary'
            open={props.drawerOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            style={{ drawerStyles }}
            sx={[drawerStyles('temporary'), {display: { xs: 'block', md: 'none' }}]}>
            {/* Toolbar hides under AppBar, pushes below into open space */}
            <Toolbar sx={{ height: '6.5em' }}/>
            <DrawerModeSwitcher />
        </Drawer>
        </>
    );
};

export default LeftDrawer;

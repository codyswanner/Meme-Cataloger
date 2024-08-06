import React, { useContext } from 'react';
import { Drawer, Toolbar } from '@mui/material';

import DrawerModeSwitcher from './DrawerModeSwitcher';
import AppDataContext from '../SupportingModules/AppDataContext';


/**
 * LeftDrawer contains checkboxes to select tags for image filtering.
 * 
 * @returns The LeftDrawer component to be rendered in the app.
 */
function LeftDrawer() {
    const {appState} = useContext(AppDataContext);

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
        appState.setIsClosingDrawer(false);
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
            open={appState.drawerOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={[drawerStyles('temporary'), {display: { xs: 'block', md: 'none' }}]}>
            {/* Toolbar hides under AppBar, pushes below into open space */}
            <Toolbar sx={{ height: '6.5em' }}/>
            <DrawerModeSwitcher />
        </Drawer>
        </>
    );
};

export default LeftDrawer;

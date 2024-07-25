import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';

import TopAppBar from './TopAppBar/TopAppBar';
import MainContentArea from './MainContentArea';
import LeftDrawer from './LeftDrawer/LeftDrawer';


/**
 * Provides basic layout of the page.
 * Frames content with a LeftDrawer and TopAppBar.
 * 
 * @returns The ContentFrame component to be rendered in the app.
 */
function ContentFrame() {
    const [drawerOpen, setDrawerOpen] = React.useState(false);
    const [isClosingDrawer, setIsClosingDrawer] = React.useState(false);

    return (
        <Box sx={{ display: 'flex' }}>
            {/* Provided by MUI Material for basic styling */}
            <CssBaseline />

            {/* Navigation banner/AppBar at top of the page */}
            <TopAppBar
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                setIsClosingDrawer={setIsClosingDrawer}/>

            {/* Drawer on left side, holds tag filter options */}
            <LeftDrawer
                drawerOpen={drawerOpen}
                setDrawerOpen={setDrawerOpen}
                isClosingDrawer={isClosingDrawer}
                setIsClosingDrawer={setIsClosingDrawer}/>

            {/* Main content area */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar /> {/* Empty toolbar hides under fixed position AppBar, pushes elements into visible space */}
                <MainContentArea />
            </Box>
        </Box>
    );
};

export default ContentFrame;

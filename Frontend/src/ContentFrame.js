import React from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';

import TopAppBar from './TopAppBar/TopAppBar';
import MainContentArea from './MainContentArea';
import LeftDrawer from './LeftDrawer/LeftDrawer';


function ContentFrame() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation banner/AppBar at top of the page */}
            <TopAppBar/>

            {/* Drawer on left side, holds tag filter options */}
            <LeftDrawer />

            {/* Main content area */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar /> {/* Empty toolbar hides under fixed position AppBar, pushes elements into visible space */}
                <MainContentArea />
            </Box>
        </Box>
    );
};

export default ContentFrame;

import React, { useContext } from 'react';
import { Box, Button, AppBar, CssBaseline, Toolbar, Typography} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'
import { styled } from '@mui/material/styles';

import TopAppBar from './TopAppBar';
import MainContentArea from './MainContentArea';
import LeftDrawer from './LeftDrawer';
import AppDataContext from './AppDataContext';





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
}

export default ContentFrame;

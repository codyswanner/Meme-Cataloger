import React, { useContext } from 'react';
import { Box, CssBaseline, Toolbar } from '@mui/material';

import AppDataContext from './SupportingModules/AppDataContext';
import TopAppBar from './TopAppBar/TopAppBar';
import LeftDrawer from './LeftDrawer/LeftDrawer';
import VirtuosoGridWrapper from './VirtualizedImageList';


/**
 * Provides basic layout of the page.
 * Frames content with a LeftDrawer and TopAppBar.
 * 
 * @returns The ContentFrame component to be rendered in the app.
 */
function ContentFrame() {
    const appData = useContext(AppDataContext);
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
                <div className='flex-container'>
                    <VirtuosoGridWrapper imageList={appData[0]}/>
                </div>
            </Box>
        </Box>
    );
};

export default ContentFrame;

import React from 'react';
import { Box, AppBar, CssBaseline, Toolbar, Typography} from '@mui/material';

import MainContentArea from './MainContentArea';
import LeftDrawer from './LeftDrawer';

function ContentFrame(props) {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation banner/AppBar at top of the page */}
            <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant='h5' noWrap component='div'>
                        Meme-opolis
                    </Typography>
                </Toolbar>
            </AppBar>

            {/* Drawer on left side, holds tag filter options */}
            <LeftDrawer data={props.data}/>

            {/* Main content area */}
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar /> {/* Empty toolbar hides under fixed position AppBar, pushes elements into visible space */}
                <MainContentArea data={props.data}/>
            </Box>
        </Box>
    );
}

export default ContentFrame;

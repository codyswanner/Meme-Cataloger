import React, { useContext } from 'react';
import { Box, Button, AppBar, CssBaseline, Toolbar, Typography} from '@mui/material';
import UploadIcon from '@mui/icons-material/Upload'
import { styled } from '@mui/material/styles';

import MainContentArea from './MainContentArea';
import LeftDrawer from './LeftDrawer';
import AppDataContext from './AppDataContext';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
  });

function ContentFrame() {
    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            {/* Navigation banner/AppBar at top of the page */}
            <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant='h5' noWrap component='div'>
                        Meme-opolis
                    </Typography>
                    <Button component="label" variant="contained" sx={{marginLeft: "auto"}} startIcon={<UploadIcon/>}>
                        Upload
                        <VisuallyHiddenInput type='file'/>
                    </Button>
                </Toolbar>
            </AppBar>

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

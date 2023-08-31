import * as React from 'react';
import { Box, Drawer, AppBar, CssBaseline, Toolbar, List, Typography, Divider, ListItem, ListItemButton, ListItemText } from '@mui/material';
import MainContentArea from './MainContentArea';

const drawerWidth = 240;

function ContentFrame() {

    const handleButtonClick = (buttonType) => {
        console.log(`Clicked ${buttonType} button`);
    }

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar position='fixed' sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
                <Toolbar>
                    <Typography variant='h5' noWrap component='div'>
                        Image Gallery
                    </Typography>
                </Toolbar>
            </AppBar>

            <Drawer
                variant='permanent'
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    ['& .MuiDrawer-paper']: {width: drawerWidth},
                }}
            >
                <Toolbar /> {/* Empty toolbar hides under fixed position AppBar, pushes elements into visible space */}
                <Box sx={{ overflow: 'auto' }}>
                    <List>
                        {['Nature', 'Vacation', 'Important', 'Screenshots', 'Posters', 'Documents', 'Other'].map((text, index) => (
                            <ListItemButton key={index} onClick={() => handleButtonClick(text)}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))}
                    </List>
                    <Divider />
                    <List>
                        {['Archive', 'Trash'].map((text, index) => (
                            <ListItemButton key={index} onClick={() => handleButtonClick(text)}>
                                <ListItemText primary={text} />
                            </ListItemButton>
                        ))}
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1 }}>
                <Toolbar /> {/* Empty toolbar hides under fixed position AppBar, pushes elements into visible space */}
                <MainContentArea/>
            </Box>
        </Box>
    );
}

export default ContentFrame;

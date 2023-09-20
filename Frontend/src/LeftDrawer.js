import * as React from 'react';
import { Box, Drawer, Toolbar, List, Divider, ListItemButton, ListItemText } from '@mui/material';

const drawerWidth = 240;

function LeftDrawer() {
    return (
        <Drawer
            variant='permanent'
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                ['& .MuiDrawer-paper']: { width: drawerWidth },
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
    );
}

export default LeftDrawer;

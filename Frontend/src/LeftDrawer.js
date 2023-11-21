import * as React from 'react';
import FilterCheckbox from './FilterCheckbox'
import filterSocket from './FilterSocket';
import { Box, Drawer, Toolbar, List, Divider, ListItemButton, ListItemText, FormControlLabel, Checkbox } from '@mui/material';

const drawerWidth = 240;

function LeftDrawer() {
    return (
        <Drawer
            variant='permanent'
            sx={{
                backgroundColor: '#666666',
                width: drawerWidth,
                flexShrink: 0,
                ['& .MuiDrawer-paper']: { width: drawerWidth, backgroundColor: '#aaaaaa' },
                marginRight: '0.5%',
            }}
        >
            <Toolbar /> {/* Empty toolbar hides under fixed position AppBar, pushes elements into visible space */}
            <Box sx={{ overflow: 'auto' }}>
                <List>
                    {['Nature', 'Vacation', 'Important', 'Screenshots', 'Posters', 'Documents', 'Other'].map((text, index) => (
                        // <ListItemButton key={index} onClick={() => handleButtonClick(text)}>
                        //     <ListItemText primary={text} />
                        // </ListItemButton>

                        <FilterCheckbox text={text} socket={filterSocket}/>
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

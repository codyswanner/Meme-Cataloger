import * as React from 'react';
import FilterCheckbox from './FilterCheckbox'
import filterSocket from './FilterSocket';
import { Box, Drawer, Toolbar, List, Divider, ListItemButton, ListItemText } from '@mui/material';

function handleButtonClick() {
    // handle click for Archive and Trash buttons
    null;
}

function LeftDrawer(props) {
    let tagsList = props.data[1];
    const drawerWidth = 240; // Variable based on screen size?
    
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
                    {tagsList.map((tag) => {
                        const tagId = tag.id;
                        const tagName = tag.name;

                        return(<FilterCheckbox text={tagName} socket={filterSocket} key={tagId} tagId={tagId}/>)
                    })}
                </List>
                <Divider />
                <List>
                    {['Archive', 'Trash'].map((text, index) => (
                        // handleButtonClick not implemented for Archive and Trash features yet
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

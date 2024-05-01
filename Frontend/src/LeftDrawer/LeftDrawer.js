import React, { useContext } from 'react';
import { Box, Drawer, Toolbar, List, Divider, ListItemButton, ListItemText } from '@mui/material';

import AppDataContext from '../SupportingModules/AppDataContext';
import FilterCheckbox from './FilterCheckbox';


function handleButtonClick() {
    // handle click for Archive and Trash buttons
    null;
};

/**
 * LeftDrawer contains checkboxes to select tags for image filtering.
 * 
 * @returns The LeftDrawer component to be rendered in the app.
 */
function LeftDrawer() {
    const appData = useContext(AppDataContext);
    let tagsList = appData[1];
    const drawerWidth = 240; // Future: Variable based on screen size?
    
    return (
        <Drawer
            variant='permanent' // Future: change for mobile
            sx={{
                backgroundColor: '#666666',
                width: drawerWidth,
                flexShrink: 0,
                ['& .MuiDrawer-paper']: { width: drawerWidth, backgroundColor: '#aaaaaa' },
                marginRight: '0.5%',
            }}>
            <Toolbar /> {/* Empty toolbar hides under fixed position AppBar, pushes elements into visible space */}
            <Box sx={{ overflow: 'auto' }}>
                <List> {/* List tags available for filtering */}
                    {tagsList.map((tag) => {
                        const tagId = tag.id;
                        const tagName = tag.name;
                        return(<FilterCheckbox text={tagName} key={tagId} tagId={tagId}/>)
                    })}
                </List>
                <Divider/>
                <List> {/* Misc non-tag/filter options */}
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
};

export default LeftDrawer;

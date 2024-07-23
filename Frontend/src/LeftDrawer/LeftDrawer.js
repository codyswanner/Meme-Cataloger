import React, { useContext } from 'react';
import { Box, Drawer, Toolbar, List, Divider, ListItemButton, ListItemText } from '@mui/material';

import AppDataContext from '../SupportingModules/AppDataContext';
import FilterCheckbox from './FilterCheckbox';


function handleButtonClick() {
    // handle click for Archive and Trash buttons
    null;
};

function DrawerContents() {
    const appData = useContext(AppDataContext);
    let tagsList = appData[1];

    return (
        <>
        <Toolbar /> {/* Empty toolbar hides under fixed position AppBar, pushes elements into visible space */}
        <Box sx={{ overflow: 'auto' }}>
            <List> {/* List tags available for filtering */}
                {tagsList.map((tag) => {
                    const tagId = tag.id;
                    const tagName = tag.name;
                    return(<FilterCheckbox data-testid={'filter-checkbox'} text={tagName} key={tagId} tagId={tagId}/>)
                })}
            </List>
            <Divider/>
            <List> {/* Misc non-tag/filter options */}
                {['Archive', 'Trash'].map((text, index) => (
                    // handleButtonClick not implemented for Archive and Trash features yet
                    <ListItemButton key={index} onClick={() => handleButtonClick(text)}>
                        <ListItemText primary={text} primaryTypographyProps={{fontSize: {'xs': 40, 'md': 25}}}/>
                    </ListItemButton>
                ))}
            </List>
        </Box>
        </>
    );
};

/**
 * LeftDrawer contains checkboxes to select tags for image filtering.
 * 
 * @returns The LeftDrawer component to be rendered in the app.
 */
function LeftDrawer(props) {
    const drawerWidth = 240; // Future: Variable based on screen size?

    const handleDrawerClose = () => {
        setIsClosing(true);
        setMobileOpen(false);
    };

    const handleDrawerTransitionEnd = () => {
        props.setIsClosing(false);
    };
    
    return (
        <>
        {/* Permanent-style drawer for large screens -- hides on small screens */}
        <Drawer
            variant='permanent'
            sx={{
                backgroundColor: '#666666',
                width: drawerWidth,
                flexShrink: 0,
                ['& .MuiDrawer-paper']: { width: drawerWidth, backgroundColor: '#aaaaaa' },
                marginRight: '0.5%',
                display: { xs: 'none', md: 'block' }
            }}>
            <DrawerContents />
        </Drawer>

        {/* Temporary/hidable drawer for small screens -- hides on large screens */}
        <Drawer
            variant='temporary'
            open={props.drawerOpen}
            onTransitionEnd={handleDrawerTransitionEnd}
            onClose={handleDrawerClose}
            ModalProps={{
                keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
                backgroundColor: '#666666',
                width: '100%',
                flexShrink: 0,
                ['& .MuiDrawer-paper']: { width: '100%', backgroundColor: '#aaaaaa' },
                marginRight: '0.5%',
                display: { xs: 'block', md: 'none' }  }}
        >
            <DrawerContents/>
        </Drawer>
        </>
    );
};

export default LeftDrawer;

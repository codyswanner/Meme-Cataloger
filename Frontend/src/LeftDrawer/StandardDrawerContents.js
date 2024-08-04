import React, { useContext } from 'react';
import { Box, Divider, List } from '@mui/material';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';

import AppDataContext from '../SupportingModules/AppDataContext';
import FilterCheckbox from './FilterCheckbox';
import FeatureButton from './FeatureButton';
import DrawerHeader from './DrawerHeader';


export default function StandardDrawerContents(props) {
    const appData = useContext(AppDataContext);

    return(
        <Box sx={{ overflow: 'auto' }}>
            <DrawerHeader handleEdit={props.handleEdit}/>
            <List> {/* List tags available for filtering */}
                {appData.tagData.map((tag) => {
                    const tagId = tag.id;
                    const tagName = tag.name;
                    return(<FilterCheckbox
                        data-testid={'filter-checkbox'}
                        text={tagName}
                        key={tagId}
                        tagId={tagId}/>)
                })}
            </List>
            <Divider/>
            <List> {/* Misc non-tag/filter options */}
                <FeatureButton
                    name="Archive"
                    startIcon={<ArchiveIcon/>}
                    action={props.handleArchive}
                    active={false}/>
                <FeatureButton
                    name="Trash"
                    startIcon={<DeleteIcon/>}
                    action={props.handleTrash}
                    active={false}/>
            </List>
        </Box>
    );
};

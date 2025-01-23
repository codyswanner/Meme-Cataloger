import React from 'react';
import { FormControlLabel, Checkbox } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

import filterSocket from '../../SupportingModules/FilterSocket';


/**
 * Detects when a FilterCheckbox is clicked, 
 * and sends a message to backend with updated state of filter.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {string} props.text label of checkbox; matches tag name to filter.
 * @param {number} props.tagId tag ID to filter for when this box is checked.
 * @param {event} event Detects when box has been clicked.
 */
const handleChange = (props, event) => {
    filterSocket.sendMessage({
        'type':'filterChange',
        'filterName': props.text,
        'filterId': props.tagId,
        'filterState': (event.target.checked ? "on" : "off")
    });
};

/**
 * Renders a checkbox that allows (de)selection of a tag for image filtering.
 * 
 * @param {object} props Contains props passed to the component.
 * @param {string} props.text label of checkbox; matches tag name to filter.
 * @param {number} props.tagId tag ID to filter for when this box is checked.
 * @param {Array} props.noMatchFilters greys out label on no results.
 * @returns The FilterCheckbox component to be rendered in the app.
 */
function FilterCheckbox(props) {
    const theme = useTheme();
    const largeScreen = useMediaQuery(theme.breakpoints.up('md'));
    const largeScreenStyle = {transform: "scale(1.15)", margin: "0 0 0 3%"};
    const smallScreenStyle = {transform: "scale(1.75)", margin: "0 1% 0 2.5%"};
    const greyedOut = props.noMatchFilters.includes(props.tagId);
    const labelStyles = {
        width: 0.98, // ensures that one item takes up one row
        color: greyedOut ? 'rgba(20, 20, 20, 0.6)' : 'rgba(0, 0, 0, 0.87)'
    };

    return(
        <FormControlLabel
            control={
                <Checkbox
                    style={ largeScreen ? largeScreenStyle : smallScreenStyle }
                />}
            label={props.text}
            componentsProps={{ typography: {fontSize: {'xs': 40, 'md': 25}}}}
            sx = {labelStyles}
            onChange={(event) => handleChange(props, event)}/>
    );
};

export default FilterCheckbox;
 
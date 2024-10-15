import React, { useContext } from 'react';

import AppDataContext from '../../SupportingModules/AppDataContext';


export default function SelectionHandler(props) {
    const { appState } = useContext(AppDataContext);
    const selection = appState.selectedItems;

    const handleClick = () => {
        if (!selection.includes(props.id)) {
            appState.setSelectedItems([...selection, props.id]);
        } else {
            appState.setSelectedItems([
                ...selection.filter((id) => {return (id != props.id)})
            ]);
        };
    };

    if (appState.selectionActive) {
        return (
            <div onClick={handleClick}>
                {props.children}
            </div>
        );
    } else {
        return (
            <a href={"http://" + window.location.host + "/image/" + props.id}>
                {props.children}
            </a>
        );
    };

};

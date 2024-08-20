import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import AppDataContext from '../../SupportingModules/AppDataContext';
import TagDrawer from './TagDrawer';

describe('TagDrawer', () => {
    let appData;
    let appState;
    let component;
    beforeEach(() => {
        appData = {
            imageData: [], // not used in this component
            tagData: [
                {'id': '10', 'name': 'Favorites', 'owner': '1'},
                {'id': '12', 'name': 'Star Wars', 'owner': '1'},
                {'id': '13', 'name': 'Dad Jokes', 'owner': '1'}
            ],
            imageTagData: [] // not used in this component
        };
        appState = { drawerOpen: false };

        component = render(
            <AppDataContext.Provider value={{appData, appState}}>
                <TagDrawer/>
            </AppDataContext.Provider>
        )
    });
    
    test('shows permanent drawer on large screen', () => {
        // I know how to do this one but only because it renders large by default
    });

    test('shows temporary drawer on small screen', () => {
        // This one is proving to be difficult to get working
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 150,
        });

        window.dispatchEvent(new Event('resize'));

        expect(screen.getByTestId('temporary-drawer')).toBeInTheDocument();
    });
    
    test('temporary drawer opens and closes', () => {
        // gotta figure out the above test first
    });

    test('correctly renders FilterCheckbox components', () => {
        const checkboxes = screen.getAllByRole('checkbox');
        expect(checkboxes.length).toEqual(appData.tagData.length);
    });

    test('correctly renders TagEditor components', () => {
        const editButton = screen.getByRole('switch');
        fireEvent(
            editButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );

        const editors = screen.getAllByRole('textbox');
        expect(editors.length).toEqual(appData.tagData.length);
    });
});

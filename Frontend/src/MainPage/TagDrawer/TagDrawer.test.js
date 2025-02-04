import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import cssMediaQuery from 'css-mediaquery';

import AppDataContext from '../../SupportingModules/AppDataContext';
import TagDrawer from './TagDrawer';


describe('TagDrawer', () => {
    let appData;
    let appState;
    
    beforeEach(() => {
        // appData provides info for items to be rendered
        appData = {
            imageData: [], // not used in this component
            tagData: [
                {'id': '10', 'name': 'Favorites', 'owner': '1'},
                {'id': '12', 'name': 'Star Wars', 'owner': '1'},
                {'id': '13', 'name': 'Dad Jokes', 'owner': '1'}
            ],
            imageTagData: [] // not used in this component
        };
        appState = {
            drawerOpen: true, // visible by default
            noMatchFilters: []
        }; 

        // jsdom does not have window.matchMedia;
        // it must be mocked for testing screen-responsive components.
        global.matchMedia = jest.fn().mockImplementation(query => {
            return {
                matches: cssMediaQuery.match(query, {
                    width: window.innerWidth
                }),
                addListener: jest.fn(),
                removeListener: jest.fn()
            };
        });

        // Set the screen size large by default
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 1500
        });
        window.dispatchEvent(new Event('resize'));
    });
    
    test('shows permanent drawer on large screen', () => {
        render(
            <AppDataContext.Provider value={{appData, appState}}>
                <TagDrawer/>
            </AppDataContext.Provider>
        );

        expect(screen.getByTestId('permanent-drawer')).toBeInTheDocument();
        expect(screen.queryByTestId('temporary-drawer'))
            .not.toBeInTheDocument();
    });

    test('shows temporary drawer on small screen', () => {
        // Check drawer behaves properly on small screens
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 150
        });
        window.dispatchEvent(new Event('resize'));

        render(
            <AppDataContext.Provider value={{appData, appState}}>
                <TagDrawer/>
            </AppDataContext.Provider>
        );

        expect(screen.getByTestId('temporary-drawer')).toBeInTheDocument();
        expect(screen.queryByTestId('permanent-drawer'))
            .not.toBeInTheDocument();
    });

    test('temporary drawer responds to appState', () => {
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 150
        });
        window.dispatchEvent(new Event('resize'));

        appState = {...appState, drawerOpen: false};
        const {rerender} = render(
            <AppDataContext.Provider value={{appData, appState}}>
                <TagDrawer/>
            </AppDataContext.Provider>
        );
        expect(screen.getByTestId('temporary-drawer'))
            .toHaveClass('MuiModal-hidden');

        appState = {...appState, drawerOpen: true};
        rerender(
            <AppDataContext.Provider value={{appData, appState}}>
                <TagDrawer/>
            </AppDataContext.Provider>
        );
        expect(screen.getByTestId('temporary-drawer'))
            .not.toHaveClass('MuiModal-hidden');
    });

    test('correctly renders FilterCheckbox components on large screen', () => {
        render(
            <AppDataContext.Provider value={{appData, appState}}>
                <TagDrawer/>
            </AppDataContext.Provider>
        );

        // This will include "exact match" checkbox
        const checkboxes = screen.getAllByRole('checkbox');
        // Check for all test filters plus "exact match" checkbox
        expect(checkboxes.length).toEqual(appData.tagData.length+1);
    });

    test('correctly renders TagEditor components on large screen', () => {
        render(
            <AppDataContext.Provider value={{appData, appState}}>
                <TagDrawer/>
            </AppDataContext.Provider>
        );

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

    test('correctly renders FilterCheckbox components on small screen', () => {
        // Check drawer behaves properly on small screens
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 150
        });
        window.dispatchEvent(new Event('resize'));

        render(
            <AppDataContext.Provider value={{appData, appState}}>
                <TagDrawer/>
            </AppDataContext.Provider>
        );
        
        // This will include "exact match" checkbox
        const checkboxes = screen.getAllByRole('checkbox');
        // Check for all test filters plus "exact match" checkbox
        expect(checkboxes.length).toEqual(appData.tagData.length+1);
    });

    test('correctly renders TagEditor components on small screen', () => {
        // Check drawer behaves properly on small screens
        Object.defineProperty(window, 'innerWidth', {
            writable: true,
            configurable: true,
            value: 150
        });
        window.dispatchEvent(new Event('resize'));
        
        render(
            <AppDataContext.Provider value={{appData, appState}}>
                <TagDrawer/>
            </AppDataContext.Provider>
        );

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

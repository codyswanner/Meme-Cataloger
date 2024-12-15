import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import filterSocket from '../../SupportingModules/FilterSocket';
import AppDataContext from '../../SupportingModules/AppDataContext';
import ApplyTagsPopper from './ApplyTagsPopper';

jest.mock('../../SupportingModules/FilterSocket', () => ({
    onOpen: jest.fn(),
    onClose: jest.fn(),
    send: jest.fn(),
    close: jest.fn(),
    sendMessage: jest.fn()
}));

describe('ApplyTagsPopper', () => {
    let appData = {}
    let appState = {}

    beforeAll(() => {
        appData.tagData = [
            {'id': 34, 'name': 'Favorites', 'owner': 1},
            {'id': 55, 'name': 'To be', 'owner': 1},
            {'id': 89, 'name': 'Or not to be', 'owner': 1},
            {'id': 144, 'name': 'That is the question', 'owner': 1}
        ];

        appData.imageTagData = [
            {'id': 9, 'image_id': 3, 'tag_id': 34},
            {'id': 25, 'image_id': 5, 'tag_id': 55},
            {'id': 64, 'image_id': 8, 'tag_id': 89}
        ];

        appState.selectedItems = [3, 5, 8];
    });
    
    test('opens TagDialog', () => {

        const {rerender} = render(
            <AppDataContext.Provider value={{ appData, appState }}>
                <ApplyTagsPopper open={false}/>
            </AppDataContext.Provider>
        );

        // assert TagDialog is closed
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();

        // set open=true and rerender
        rerender(
            <AppDataContext.Provider value={{ appData, appState }}>
                <ApplyTagsPopper open={true}/>
            </AppDataContext.Provider>
        );

        // assert TagDialog is open
        expect(screen.getByRole('dialog')).toBeInTheDocument();
    
    });

    test('closes TagDialog', () => {

        const {rerender} = render(
            <AppDataContext.Provider value={{ appData, appState }}>
                <ApplyTagsPopper open={true}/>
            </AppDataContext.Provider>
        );

        // assert TagDialog is open
        expect(screen.getByRole('dialog')).toBeInTheDocument();

        // set open=false and rerender
        rerender(
            <AppDataContext.Provider value={{ appData, appState }}>
                <ApplyTagsPopper open={false}/>
            </AppDataContext.Provider>
        );

        // assert TagDialog is closed
        expect(screen.queryByRole('dialog')).not.toBeInTheDocument();
    });

    test('records changes and submits form', () => {
        render(
            <AppDataContext.Provider value={{ appData, appState }}>
                <ApplyTagsPopper open={true}/>
            </AppDataContext.Provider>
        );

        const checkboxes = screen.queryAllByRole('checkbox');

        const clickCheckbox = (index) => {
            fireEvent(
                checkboxes[index],
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true
                })
            );
        };

        // Make some changes to the form
        clickCheckbox(1);
        clickCheckbox(2);
        clickCheckbox(2);
        clickCheckbox(3);

        // Submit the form
        fireEvent(
            screen.getByText('Submit'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );

        const expectedFormActions = [
            {'id': 34, 'action': 'none'},
            {'id': 55, 'action': 'add'},
            {'id': 89, 'action': 'remove'},
            {'id': 144, 'action': 'add'}
        ];

        const expectedMessage = {
            'type': 'updateTagsFromGallery',
            'actions': expectedFormActions,
            'selectedImages': appState.selectedItems,
            'user': 1  // matches as set in beforeAll
        };

        // filterSocket should send the results as expected on Submit
        expect(filterSocket.sendMessage).toHaveBeenCalledTimes(1);
        expect(filterSocket.sendMessage)
        .toHaveBeenLastCalledWith(expectedMessage);
    });

    test('resets formActions', () => {
        render(
            <AppDataContext.Provider value={{ appData, appState }}>
                <ApplyTagsPopper open={true}/>
            </AppDataContext.Provider>
        );

        const checkboxes = screen.queryAllByRole('checkbox');

        const clickCheckbox = (index) => {
            fireEvent(
                checkboxes[index],
                new MouseEvent('click', {
                    bubbles: true,
                    cancelable: true
                })
            );
        };

        // Make some changes to the form
        clickCheckbox(1);
        clickCheckbox(2);
        clickCheckbox(2);
        clickCheckbox(3);

        // Reset the form
        fireEvent(
            screen.getByText('Reset'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );

        // Submit the form
        fireEvent(
            screen.getByText('Submit'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );

        // reset form should show 'none' for all actions
        const expectedFormActions = [
            {'id': 34, 'action': 'none'},
            {'id': 55, 'action': 'none'},
            {'id': 89, 'action': 'none'},
            {'id': 144, 'action': 'none'}
        ];

        const expectedMessage = {
            'type': 'updateTagsFromGallery',
            'actions': expectedFormActions,
            'selectedImages': appState.selectedItems,
            'user': 1  // matches as set in beforeAll
        };

        // filterSocket should send the results as expected on Submit
        expect(filterSocket.sendMessage).toHaveBeenCalledTimes(1);
        expect(filterSocket.sendMessage)
        .toHaveBeenLastCalledWith(expectedMessage);
    });
});

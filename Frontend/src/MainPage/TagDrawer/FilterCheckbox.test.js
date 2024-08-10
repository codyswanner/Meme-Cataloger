import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import filterSocket from '../../SupportingModules/FilterSocket';
import FilterCheckbox from './FilterCheckbox';

jest.mock('../../SupportingModules/FilterSocket', () => ({
    onOpen: jest.fn(),
    onClose: jest.fn(),
    send: jest.fn(),
    close: jest.fn(),
    sendMessage: jest.fn()
}));


describe('FilterSocket', () => {
    let tagName;
    let tagId;
    let component;

    beforeEach(() => {
        tagName = 'Test Tag';
        tagId = '1';
        component = render(<FilterCheckbox text={tagName} tagId={tagId} key={tagId}/>);
    });

    test('toggles checked and unchecked', () => {
        const checkbox = screen.getByRole('checkbox');

        expect(checkbox.checked).toBeFalsy();

        fireEvent(
            checkbox,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );

        expect(checkbox.checked).toBeTruthy();

        fireEvent(
            checkbox,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );

        expect(checkbox.checked).toBeFalsy();
    });

    test('sends Websocket message', () => {
        const checkbox = screen.getByRole('checkbox');

        const firstExpectedMessage = {
            'type':'filterChange',
            'filterName': 'Test Tag',
            'filterId': '1',
            'filterState': "on"
        };

        fireEvent(
            checkbox,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );

        expect(filterSocket.sendMessage).toHaveBeenLastCalledWith(firstExpectedMessage);

        const secondExpectedMessage = {
            'type':'filterChange',
            'filterName': 'Test Tag',
            'filterId': '1',
            'filterState': "off"
        };
        
        fireEvent(
            checkbox,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );

        expect(filterSocket.sendMessage).toHaveBeenLastCalledWith(secondExpectedMessage);

    });
});

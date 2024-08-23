import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import filterSocket from '../../SupportingModules/FilterSocket';
import DeleteImageButton from './DeleteImageButton';

jest.mock('../../SupportingModules/FilterSocket', () => ({
    onOpen: jest.fn(),
    onClose: jest.fn(),
    send: jest.fn(),
    close: jest.fn(),
    sendMessage: jest.fn()
}));


describe('DeleteImageButton', () => {
    let id;

    beforeEach(() => {
        id = 1;
        render(<DeleteImageButton id={id}/>);
    });
    test('sends websocket message on click', () => {
        fireEvent(
            screen.getByRole('button'),
            new MouseEvent('click', {
                bubbles:true,
                cancelable:true
            })
        );

        const expectedMessage = {
            'type': 'deleteImage',
            'imageId': id
        };

        expect(filterSocket.sendMessage).toHaveBeenCalledTimes(1);
        expect(filterSocket.sendMessage)
            .toHaveBeenLastCalledWith(expectedMessage);
    });
});

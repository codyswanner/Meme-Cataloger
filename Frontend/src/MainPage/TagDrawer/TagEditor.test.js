import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import filterSocket from '../../SupportingModules/FilterSocket';
import TagEditor from './TagEditor';

jest.mock('../../SupportingModules/FilterSocket', () => ({
    onOpen: jest.fn(),
    onClose: jest.fn(),
    send: jest.fn(),
    close: jest.fn(),
    sendMessage: jest.fn()
}));


describe('TagEditor', () => {
    let text;
    let tagId;
    let key = tagId;
    let component;

    beforeEach(() => {
        text = 'Test Editor';
        tagId = '1';
        component = render(<TagEditor text={text} tagId={tagId} key={key}/>);
    });

    test('edits tag name on input', () => {
        const textbox = screen.getByRole('textbox');

        fireEvent.change(textbox, {
            target: { value: 'Changed input' }
        });

        expect(textbox.value).toBe('Changed input');
    });

    test('sends Websocket message', () => {
        const textbox = screen.getByRole('textbox');

        const firstExpectedMessage = {
            'type': 'updateTagName',
            'tagId': '1',
            'name': 'Changed input'
        };

        fireEvent.change(textbox, {
            target: { value: 'Changed input' }
        });

        expect(filterSocket.sendMessage).toHaveBeenLastCalledWith(firstExpectedMessage);

        const secondExpectedMessage = {
            'type': 'updateTagName',
            'tagId': '1',
            'name': 'FRESHAVACODU'
        };
        
        fireEvent.change(textbox, {
            target: { value: 'FRESHAVACODU' }
        });

        expect(filterSocket.sendMessage).toHaveBeenLastCalledWith(secondExpectedMessage);

    });
});

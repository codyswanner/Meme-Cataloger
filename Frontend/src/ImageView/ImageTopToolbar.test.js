import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import filterSocket from '../SupportingModules/FilterSocket';
import ImageDataContext from './ImageDataContext';
import ImageTopToolbar from './ImageTopToolbar';

jest.mock('../SupportingModules/FilterSocket', () => ({
    onOpen: jest.fn(),
    onClose: jest.fn(),
    send: jest.fn(),
    close: jest.fn(),
    sendMessage: jest.fn()
}));


describe('ImageTopToolbar', () => {
    let imageData;

    beforeEach(() => {
        imageData = {
            "id": '1',
            "source": "http://127.0.0.1:8000/media/images/20201109_113624.jpg",
            "description": "",
            "imageTags": [42, 43]
        };
    });

    test('renders all child components', () => {
        // not sure if snapshot is appropriate... rendering check in any case
        render(
            <ImageDataContext.Provider value={imageData}>
                <ImageTopToolbar/>
            </ImageDataContext.Provider>
        );
        expect(screen.getByRole('textbox')).toBeInTheDocument();
        expect(screen.getAllByRole('button').length).toEqual(3);
    });

    test('description change', () => {
        render(
            <ImageDataContext.Provider value={imageData}>
                <ImageTopToolbar/>
            </ImageDataContext.Provider>
        );

        const firstExpectedMessage = {
            'type': 'updateDescription', 
            'imageId': '1',
            'description': 'Changed input'
        };
        
        fireEvent.change(
            screen.getByRole('textbox'),
            {target: { value: 'Changed input' }}
        );

        expect(filterSocket.sendMessage)
            .toHaveBeenLastCalledWith(firstExpectedMessage);
    });
});

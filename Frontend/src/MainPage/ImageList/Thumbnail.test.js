import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import AppDataContext from '../../SupportingModules/AppDataContext';
import Thumbnail from './Thumbnail';


describe('Thumbnail', () => {
    let appState;

    beforeEach(() => {
        appState = {
            selectedItems: []
        };
    });

    test('renders ImageThumbnail for images', () => {
        const src = '~/TestAssets/test-image.jpg';
        const id = 404;
        render(
            <AppDataContext.Provider value={{ appState }}>
                <Thumbnail src={src} id={id}/>
            </AppDataContext.Provider>
        );

        expect(screen.getByRole('img')).toBeInTheDocument();
    });

    test('renders VideoThumbnail for videos', () => {
        const src = '~/TestAssets/test-video.mp4';
        const id = 404;
        render(
            <AppDataContext.Provider value={{ appState }}>
                <Thumbnail src={src} id={id}/>
            </AppDataContext.Provider>
        );

        // Due to rendering implementation, can't get role for this.
        // Use test id instead.
        expect(screen.getByTestId('video-thumbnail')).toBeInTheDocument();
    });

    test('renders error for unknown filetype', () => {
        const src = 'cow.moo'; // does not match filetype options
        const id = 404;
        const errorSpy = jest.spyOn(console, 'error')
            .mockImplementation(() => {});
        try {
            render(
                <AppDataContext.Provider value={{ appState }}>
                    <Thumbnail src={src} id={id}/>
                </AppDataContext.Provider>
            );
        } catch (e) {
            // error expected; ignore
        };

        expect(errorSpy).toHaveBeenCalledTimes(1);
        expect(errorSpy).toHaveBeenCalledWith(
            'Source cow.moo does not match expected file types'
        );

        errorSpy.mockRestore();
    });
});

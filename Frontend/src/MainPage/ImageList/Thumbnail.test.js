import React from 'react';
import { screen, render, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

import Thumbnail from './Thumbnail';


describe('Thumbnail', () => {
    const hrefRegex = /http:\/\/.+\/image\/404/i

    test('renders ImageThumbnail for images', () => {
        const src = '~/TestAssets/test-image.jpg';
        const id = 404;
        render(<Thumbnail src={src} id={id}/>);

        expect(screen.getByRole('img')).toBeInTheDocument();
        expect(screen.getByRole('link').href).toMatch(hrefRegex);
    });

    test('renders VideoThumbnail for videos', () => {
        const src = '~/TestAssets/test-video.mp4';
        const id = 404;
        render(<Thumbnail src={src} id={id}/>);

        // Due to rendering implementation, can't get role for this.
        // Use test id instead.
        expect(screen.getByTestId('video-thumbnail')).toBeInTheDocument();
        expect(screen.getByRole('link').href).toMatch(hrefRegex);
    });

    test('renders error for unknown filetype', () => {
        const src = 'cow.moo'; // does not match filetype options
        const id = 404;
        const errorSpy = jest.spyOn(console, 'error')
            .mockImplementation(() => {});
        try {
            render(<Thumbnail src={src} id={id}/>);
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
import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import UploadDialog from './UploadDialog';

jest.mock('./UploadBox', () => () => {<div/>});


describe('UploadDialog', () => {
    let handleClose = jest.fn();

    test('renders closed', () => {
        render(<UploadDialog open={false} handleClose={handleClose}/>);
        expect(screen.queryByRole('presentation')).not.toBeInTheDocument();
    });

    test('renders open', () => {
        render(<UploadDialog open={true} handleClose={handleClose}/>);

        // There are two presentation role elements; both should be present
        const expectedElements = screen.getAllByRole('presentation');
        expect(expectedElements[0]).toBeInTheDocument();
        expect(expectedElements[1]).toBeInTheDocument();
    });
});

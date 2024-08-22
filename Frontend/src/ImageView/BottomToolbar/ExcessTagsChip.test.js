import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import ExcessTagsChip from './ExcessTagsChip';


describe('ExcessTagsChip', () => {
    test('renders correct number', () => {
        for (let i = 1; i <= 100; i++) {
            render(<ExcessTagsChip labelText={i.toString()}/>);
            expect(screen.getByText('+' + i.toString())).toBeInTheDocument();
        };
    });
});

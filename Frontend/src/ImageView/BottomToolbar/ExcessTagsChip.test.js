import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';
import { alpha, createTheme } from '@mui/material';

import ExcessTagsChip from './ExcessTagsChip';


describe('ExcessTagsChip', () => {
    test('renders correct number', () => {
        const mockTheme = createTheme({
            palette: {
                primary: {
                main: alpha('#333333', 0.6),
                },
            }
        });
        for (let i = 1; i <= 100; i++) {
            render(
                <ExcessTagsChip labelText={i.toString()} theme={mockTheme}/>
            );
            expect(screen.getByText('+' + i.toString())).toBeInTheDocument();
        };
    });
});

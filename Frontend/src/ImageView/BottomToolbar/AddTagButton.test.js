import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import AddTagButton from './AddTagButton';


describe('AddTagButton', () => {
    let handleClick;
    let buttonRef;

    beforeEach(() => {
        handleClick = jest.fn();
        buttonRef = {};
        render(<AddTagButton handleClick={handleClick} buttonRef={buttonRef}/>)
    });

    test('handles click', () => {
        const button = screen.getByRole('button');
        
        fireEvent(
            button,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );

        expect(handleClick).toHaveBeenCalledTimes(1);
    });
});

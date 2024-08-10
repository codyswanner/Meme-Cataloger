import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import DrawerHeader from './DrawerHeader';


describe('DrawerHeader', () => {
    let handleEdit;
    let component;
    beforeEach(() => {
        handleEdit = jest.fn();
        component = render(<DrawerHeader handleEdit={handleEdit}/>);
    });

    test('snapshot', () => {
        expect(component).toMatchSnapshot();
    });

    test('enables edit mode', () => {
        const editButton = screen.getByRole('button');

        fireEvent(
            editButton,
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true,
            })
        );

        expect(handleEdit).toHaveBeenCalledTimes(1);
    });
});

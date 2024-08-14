import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import CatchingPokemonIcon from '@mui/icons-material/CatchingPokemon';

import FeatureButton from './FeatureButton';


describe('FeatureButton', () => {
    let name;
    let startIcon;
    let action;
    let active;
    let component;

    beforeEach(() => {
        name = 'Test FeatureButton';
        startIcon = <CatchingPokemonIcon/>;
        action = jest.fn();
        active = false;
        component = render(<FeatureButton name={name} startIcon={startIcon} action={action} active={active}/>)
    });

    test('activates feature when clicked', () => {
        expect(action).toHaveBeenCalledTimes(0);

        fireEvent(
            component.getByRole('button'),
            new MouseEvent('click', {
                bubbles: true,
                cancelable: true
            })
        );

        expect(action).toHaveBeenCalledTimes(1);
    });
});

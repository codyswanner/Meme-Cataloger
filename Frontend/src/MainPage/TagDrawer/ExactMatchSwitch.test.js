import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import filterSocket from '../../SupportingModules/FilterSocket';
import AppDataContext from '../../SupportingModules/AppDataContext';
import ExactMatchSwitch from './ExactMatchSwitch';

jest.mock('../../SupportingModules/FilterSocket', () => ({
    onOpen: jest.fn(),
    onClose: jest.fn(),
    send: jest.fn(),
    close: jest.fn(),
    sendMessage: jest.fn()
}));


describe('ExactMatchSwitch', () => {
  let appState;
  let exactMatchFilters = {current: false};
  let activeFilters = [1, 2, 3, 5, 8, 13];
  appState = {
    exactMatchFilters: exactMatchFilters,
    activeFilters: activeFilters
  };

  test('sends Websocket request on toggle', () => {
    render(
      <AppDataContext.Provider value={{ appState }}>
        <ExactMatchSwitch />
      </AppDataContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    console.log(checkbox.value);
    expect(checkbox).toBeInTheDocument();

    fireEvent(
      checkbox,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    const expectedMessage = {
      'type': 'activeFilters',
      'exactMatch': appState.exactMatchFilters.current,
      'activeFilters': appState.activeFilters,
      'origin': 'ExactMatchSwitch.js'
    };

    expect(filterSocket.sendMessage)
      .toHaveBeenLastCalledWith(expectedMessage);
  });
});
import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import AppDataContext from '../../SupportingModules/AppDataContext';
import ApplyTagsButton from './ApplyTagsButton';


describe('ApplyTagsButton', () => {
  let appData = {}
  let appState = {}

  beforeAll(() => {
    appData.tagData = [
      {'id': 34, 'name': 'Favorites', 'owner': 1},
      {'id': 55, 'name': 'To be', 'owner': 1},
      {'id': 89, 'name': 'Or not to be', 'owner': 1},
      {'id': 144, 'name': 'That is the question', 'owner': 1}
    ];

    appData.imageTagData = [
      {'id': 9, 'image_id': 3, 'tag_id': 34},
      {'id': 25, 'image_id': 5, 'tag_id': 55},
      {'id': 64, 'image_id': 8, 'tag_id': 89}
    ];

    appState.selectedItems = [];
  });

  test('renders button', () => {
  
    render(
      <AppDataContext.Provider value={{ appData, appState }}>
        <ApplyTagsButton />
      </AppDataContext.Provider>
    );

    const buttonList = screen.queryAllByRole('button');

    expect(buttonList.length).toBe(1);
  });

  test('opens and closes ApplyTagsPopper on click', () => {
  
    render(
      <AppDataContext.Provider value={{ appData, appState }}>
        <ApplyTagsButton />
      </AppDataContext.Provider>
    );

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();

    const applyTagsButton = screen.getByRole('button');
    
    fireEvent(
      applyTagsButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(screen.getAllByRole('checkbox')[0]).toBeInTheDocument();

    fireEvent(
      applyTagsButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(screen.queryByRole('checkbox')).not.toBeInTheDocument();
  });
});

import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import AppDataContext from '../../SupportingModules/AppDataContext';
import TagCheckbox from './TagCheckbox';


describe('TagCheckbox', () => {
  let appData = {}
  let appState = {}
  const handleFormUpdate = jest.fn();

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
  });

  test('inital state selected renders correctly', () => {
    const tag = appData.tagData[0];
    appState.selectedItems = [3];

    render(
      <AppDataContext.Provider value={{appData, appState}}>
        <TagCheckbox
          tagName={tag.name}
          tagId={tag.id}
          key={tag.id}
          appContext={{ appData, appState }}
          handleFormUpdate={handleFormUpdate}
        />
      </AppDataContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.checked).toBe(true);
  });

  test('inital state unselected renders correctly', () => {
    const tag = appData.tagData[0];
    appState.selectedItems = [5];

    render(
      <AppDataContext.Provider value={{appData, appState}}>
        <TagCheckbox
          tagName={tag.name}
          tagId={tag.id}
          key={tag.id}
          appContext={{ appData, appState }}
          handleFormUpdate={handleFormUpdate}
        />
      </AppDataContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.checked).toBe(false);
  });

  test('inital state indeterminate renders correctly', () => {
    const tag = appData.tagData[0];
    appState.selectedItems = [3, 5];

    render(
      <AppDataContext.Provider value={{appData, appState}}>
        <TagCheckbox
          tagName={tag.name}
          tagId={tag.id}
          key={tag.id}
          appContext={{ appData, appState }}
          handleFormUpdate={handleFormUpdate}
        />
      </AppDataContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox')
    expect(checkbox.indeterminate).toBe(true);
  });

  test('reset button appears on change', () => {
    const tag = appData.tagData[0];
    appState.selectedItems = [3];

    render(
      <AppDataContext.Provider value={{appData, appState}}>
        <TagCheckbox
          tagName={tag.name}
          tagId={tag.id}
          key={tag.id}
          appContext={{ appData, appState }}
          handleFormUpdate={handleFormUpdate}
        />
      </AppDataContext.Provider>
    );

    expect(screen.queryByRole('button')).not.toBeInTheDocument();

    const checkbox = screen.getByRole('checkbox');
    fireEvent(
      checkbox,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  test('reset button sets to initial state of selected', () => {
    const tag = appData.tagData[0];
    appState.selectedItems = [3];

    render(
      <AppDataContext.Provider value={{appData, appState}}>
        <TagCheckbox
          tagName={tag.name}
          tagId={tag.id}
          key={tag.id}
          appContext={{ appData, appState }}
          handleFormUpdate={handleFormUpdate}
        />
      </AppDataContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent(
      checkbox,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    const resetButton = screen.getByRole('button');
    fireEvent(
      resetButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(checkbox.checked).toBe(true);
  });

  test('reset button sets to initial state of unselected', () => {
    const tag = appData.tagData[0];
    appState.selectedItems = [5];

    render(
      <AppDataContext.Provider value={{appData, appState}}>
        <TagCheckbox
          tagName={tag.name}
          tagId={tag.id}
          key={tag.id}
          appContext={{ appData, appState }}
          handleFormUpdate={handleFormUpdate}
        />
      </AppDataContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent(
      checkbox,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    const resetButton = screen.getByRole('button');
    fireEvent(
      resetButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(checkbox.checked).toBe(false);
  });

  test('reset button sets to initial state of indeterminate', () => {
    const tag = appData.tagData[0];
    appState.selectedItems = [3, 5];

    render(
      <AppDataContext.Provider value={{appData, appState}}>
        <TagCheckbox
          tagName={tag.name}
          tagId={tag.id}
          key={tag.id}
          appContext={{ appData, appState }}
          handleFormUpdate={handleFormUpdate}
        />
      </AppDataContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent(
      checkbox,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    const resetButton = screen.getByRole('button');
    fireEvent(
      resetButton,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(checkbox.indeterminate).toBe(true);
  });

  test('checkbox click toggles selection', () => {
    const tag = appData.tagData[0];
    appState.selectedItems = [5];

    render(
      <AppDataContext.Provider value={{appData, appState}}>
        <TagCheckbox
          tagName={tag.name}
          tagId={tag.id}
          key={tag.id}
          appContext={{ appData, appState }}
          handleFormUpdate={handleFormUpdate}
        />
      </AppDataContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    fireEvent(
      checkbox,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(checkbox.checked).toBe(true);
    expect(handleFormUpdate).toHaveBeenCalledTimes(1);
  });
  
  test('label click toggles selection', () => {
    const tag = appData.tagData[0];
    appState.selectedItems = [5];

    render(
      <AppDataContext.Provider value={{appData, appState}}>
        <TagCheckbox
          tagName={tag.name}
          tagId={tag.id}
          key={tag.id}
          appContext={{ appData, appState }}
          handleFormUpdate={handleFormUpdate}
        />
      </AppDataContext.Provider>
    );

    const checkbox = screen.getByRole('checkbox');
    const label = screen.getByTestId('checkbox-label');
    fireEvent(
      label,
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(checkbox.checked).toBe(true);
    expect(handleFormUpdate).toHaveBeenCalledTimes(1);
  });
});

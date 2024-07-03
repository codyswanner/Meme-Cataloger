import React from 'react';
import { render, screen } from '@testing-library/react'

import LeftDrawer from './LeftDrawer';
import AppDataContext from '../SupportingModules/AppDataContext';


describe('LeftDrawer', () => {
  test('renders', () => {
    const mockAppData = [
      [null],  // Component does not use this portion of appData
      [
        {"id":1,"name":"Test Tag 1","owner":1},
        {"id":2,"name":"Test Tag 2","owner":1},
        {"id":3,"name":"Test Tag 3","owner":1},
        {"id":4,"name":"Test Tag 4","owner":1},
      ],
      [null]  // Component does not use this portion of appData
    ]
    
    render(
      <AppDataContext.Provider value={mockAppData}>
        <LeftDrawer/>
      </AppDataContext.Provider>
    );

    expect(screen.getAllByRole('list')).toHaveLength(2);
    expect(screen.getAllByRole('checkbox')).toHaveLength(4);
    expect(screen.getAllByRole('separator')).toHaveLength(1);
    expect(screen.getAllByRole('button')).toHaveLength(2);
  });
})

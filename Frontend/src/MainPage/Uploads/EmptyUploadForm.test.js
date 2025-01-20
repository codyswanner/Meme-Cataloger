import React from 'react';
import { screen, render } from '@testing-library/react';
import '@testing-library/jest-dom';

import EmptyUploadForm from './EmptyUploadForm';


describe('EmptyUploadForm', () => {
  const setFiles = (newFiles => {appState.files = [...newFiles]});
  const appState = {files: [], setFiles: setFiles};
  const handleInput = jest.fn();

  test('renders upload button with icon', () => {
    render(
      <EmptyUploadForm
        files={appState.files}
        setFiles={appState.setFiles}
        handleInput={handleInput}
        uploadResult={'Success'}
      />
    );

    expect(screen.getByText('Upload Here!')).toBeInTheDocument();
    expect(screen.getByTestId('UploadIcon')).toBeInTheDocument();
  });

  test('includes file input', () => {
    render(
      <EmptyUploadForm
        files={appState.files}
        setFiles={appState.setFiles}
        handleInput={handleInput}
        uploadResult={'Success'}
      />
    );

    expect(screen.getByTestId('fileInput')).toBeInTheDocument();
  });

  test('Shows error when applicable', () => {
    render(
      <EmptyUploadForm
        files={appState.files}
        setFiles={appState.setFiles}
        handleInput={handleInput}
        uploadResult={'Why is the rum always gone?'}
      />
    );

    expect(screen.getByRole('alert')).toBeInTheDocument();
    expect(screen.getByText(/rum/)).toBeInTheDocument();
  });

  // /* vvvvv how to test these? vvvvv */
  // test('input allows file selection', () => {
    
  // });

  // test('input accepts files', () => {
    
  // });
});

import React from 'react';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';

import UploadBox from './UploadBox';
import AppDataContext from '../../SupportingModules/AppDataContext';

jest.mock('./FileUploadForm', () => ({files, setFiles}) => {
  return(
    <div data-testid='FileUploadForm'>
      {files.map((file, index) => (
        <button
          key={index}
          onClick={() => setFiles(files.splice(files.indexOf(file), 1))}>
          {file.name}
        </button>
      ))}
      <button>Upload</button>
      <button onClick={setFiles([])}>Clear all</button>
    </div>
  );
});

jest.mock('./EmptyUploadForm', () => ({handleInput}) => {
  return(
    <div data-testid='EmptyUploadForm'>
      <button>
        Upload Here!
        <input
          type='file'
          data-testid='fileInput'
          id='fileInput'
          onInput={handleInput} />
      </button>
    </div>
  );
});


describe('UploadBox', () => {
  const setFiles = (newFiles => {appState.files = [...newFiles]});
  const appState = {files: [], setFiles: setFiles};
  const file1 = {'name': 'test-file-1', 'type': 'image/jpeg'};
  const file2 = {'name': 'test-file-2', 'type': 'image/jpeg'};

  test('renders with EmptyUploadForm', () => {
    appState.files = [];

    render(
      <AppDataContext.Provider value={{appState}}>
        <UploadBox/>
      </AppDataContext.Provider>
    );

    expect(screen.getByText('Upload Here!')).toBeInTheDocument();
    expect(screen.getByTestId('EmptyUploadForm')).toBeInTheDocument();
  });

  test('renders with FileUploadForm', () => {
    appState.files = [file1, file2];

    render(
      <AppDataContext.Provider value={{appState}}>
        <UploadBox/>
      </AppDataContext.Provider>
    );

    // 4 buttons; 2 file buttons, 1 "Upload" and 1 "Clear all"
    expect(screen.getAllByRole('button').length).toBe(4);
    expect(screen.getByTestId('FileUploadForm')).toBeInTheDocument();
  });

  test('changes to FileUploadForm on file selection', async () => {
    const user = userEvent.setup();
    appState.files = [];

    const {rerender} = render(
      <AppDataContext.Provider value={{appState}}>
        <UploadBox/>
      </AppDataContext.Provider>
    );

    expect(screen.getByText('Upload Here!')).toBeInTheDocument();
    expect(screen.getByTestId('EmptyUploadForm')).toBeInTheDocument();

    await user.upload(screen.getByTestId('fileInput'), file1);

    rerender(
      <AppDataContext.Provider value={{appState}}>
        <UploadBox/>
      </AppDataContext.Provider>
    );

    // 3 buttons; 1 file button, 1 "Upload" and 1 "Clear all"
    expect(screen.getAllByRole('button').length).toBe(3);
    expect(screen.getByTestId('FileUploadForm')).toBeInTheDocument();
  });

  test('reverts to EmptyUploadForm on Clear all', () => {
    const user = userEvent.setup();
    appState.files = [file1, file2];

    const {rerender} = render(
      <AppDataContext.Provider value={{appState}}>
        <UploadBox/>
      </AppDataContext.Provider>
    );

    // 4 buttons; 2 file buttons, 1 "Upload" and 1 "Clear all"
    expect(screen.getAllByRole('button').length).toBe(4);
    expect(screen.getByTestId('FileUploadForm')).toBeInTheDocument();

    user.click(screen.getByText('Clear all'));

    rerender(
      <AppDataContext.Provider value={{appState}}>
        <UploadBox/>
      </AppDataContext.Provider>
    );

    expect(screen.getByText('Upload Here!')).toBeInTheDocument();
    expect(screen.getByTestId('EmptyUploadForm')).toBeInTheDocument();
  });

  test('reverts to EmptyUploadForm on last file clear', () => {
    const user = userEvent.setup();
    appState.files = [file1];

    const {rerender} = render(
      <AppDataContext.Provider value={{appState}}>
        <UploadBox/>
      </AppDataContext.Provider>
    );

    // 3 buttons; 1 file button, 1 "Upload" and 1 "Clear all"
    expect(screen.getAllByRole('button').length).toBe(3);
    expect(screen.getByTestId('FileUploadForm')).toBeInTheDocument();

    user.click(screen.getByText('test-file-1'));

    rerender(
      <AppDataContext.Provider value={{appState}}>
        <UploadBox/>
      </AppDataContext.Provider>
    );

    expect(screen.getByText('Upload Here!')).toBeInTheDocument();
    expect(screen.getByTestId('EmptyUploadForm')).toBeInTheDocument();
  });
});
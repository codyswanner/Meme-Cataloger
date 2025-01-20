import React from 'react';
import { screen, render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';

import FileUploadForm from './FileUploadForm';


describe('FileUploadForm', () => {
  const setFiles = (newFiles => {appState.files = [...newFiles]});
  const appState = {files: [], setFiles: setFiles};
  const setUploadResult = jest.fn();
  document.cookie = 'csrftoken=verySecureToken';
  const image1 = {
    'name': 'test-image-1',
    'type': 'image/jpeg'
  };
  const image2 = {
    'name': 'test-image-2',
    'type': 'image/bmp'
  };
  const image3 = {
    'name': 'test-image-3',
    'type': 'image/webp'
  };
  const image4 = {
    'name': 'test-image-4',
    'type': 'image/png'
  };
  // const notAnImage = {
  //   'name': 'txt-file',
  //   'type': 'text/plain'
  // };

  test('renders the form', () => {
    render(
      <FileUploadForm
        files={appState.files}
        setFiles={appState.setFiles}
        setUploadResult={setUploadResult}
      />
    );

    expect(screen.getByRole('list')).toBeInTheDocument();
    expect(screen.getAllByRole('button').length).toBe(2);
  });

  test('lists files passed into the form', () => {
    appState.files = [image1, image2, image3, image4];
    
    render(
      <FileUploadForm
        files={appState.files}
        setFiles={appState.setFiles}
        setUploadResult={setUploadResult}
      />
    );

    expect(screen.getByText('test-image-1')).toBeInTheDocument();
    expect(screen.getByText('test-image-2')).toBeInTheDocument();
    expect(screen.getByText('test-image-3')).toBeInTheDocument();
    expect(screen.getByText('test-image-4')).toBeInTheDocument();
  });

  test('removes individual file when clicked', () => {
    appState.files = [image1, image2, image3, image4];
    
    const {rerender} = render(
      <FileUploadForm
        files={appState.files}
        setFiles={appState.setFiles}
        setUploadResult={setUploadResult}
      />
    );

    expect(screen.getByText('test-image-1')).toBeInTheDocument();
    expect(screen.getByText('test-image-2')).toBeInTheDocument();
    expect(screen.getByText('test-image-3')).toBeInTheDocument();
    expect(screen.getByText('test-image-4')).toBeInTheDocument();

    fireEvent(
      screen.getByText('test-image-2'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    rerender(
      <FileUploadForm
        files={appState.files}
        setFiles={appState.setFiles}
        setUploadResult={setUploadResult}
      />
    );

    // expect(setFiles).toHaveBeenCalledTimes(1);
    // https://stackoverflow.com/questions/79343519/jest-fn-doesnt-call-mock-implementation

    expect(screen.getByText('test-image-1')).toBeInTheDocument();
    expect(screen.queryByText('test-image-2')).not.toBeInTheDocument();
    expect(screen.getByText('test-image-3')).toBeInTheDocument();
    expect(screen.getByText('test-image-4')).toBeInTheDocument();
  });

  test('renders submit button', () => {
    render(
      <FileUploadForm
        files={appState.files}
        setFiles={appState.setFiles}
        setUploadResult={setUploadResult}
      />
    );

    expect(screen.getByText('Upload')).toBeInTheDocument();
  });

  test('renders clear all button', () => {
    render(
      <FileUploadForm
        files={appState.files}
        setFiles={appState.setFiles}
        setUploadResult={setUploadResult}
      />
    );

    expect(screen.getByText('Clear all')).toBeInTheDocument();
  });

  test('clears file selections', () => {
    appState.files = [image1, image2, image3, image4];
    
    const {rerender} = render(
      <FileUploadForm
        files={appState.files}
        setFiles={appState.setFiles}
        setUploadResult={setUploadResult}
      />
    );

    expect(screen.getAllByRole('button').length).toBe(6);

    fireEvent(
      screen.getByText('Clear all'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    rerender(
      <FileUploadForm
        files={appState.files}
        setFiles={appState.setFiles}
        setUploadResult={setUploadResult}
      />
    );

    expect(screen.getAllByRole('button').length).toBe(2);
    expect(screen.queryByText('test-image-')).not.toBeInTheDocument();
  });

  
  {/* 
    The submit tests require mocking of backend;
    need to figure that out
  */}
  {/* 
  test('submit button submits form', () => {
    appState.files = [image1, image2];

    render(
      <FileUploadForm
        files={appState.files}
        setFiles={appState.setFiles}
        setUploadResult={setUploadResult}
      />
    );

    fireEvent(
      screen.getByText('Upload'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(setUploadResult).toHaveBeenCalledTimes(1);
    expect(setUploadResult).toHaveBeenCalledWith("Success");
  });

  test('sets error state on failed upload', () => {
    appState.files = [image1, notAnImage];

    render(
      <FileUploadForm
        files={appState.files}
        setFiles={appState.setFiles}
        setUploadResult={setUploadResult}
      />
    );

    fireEvent(
      screen.getByText('Upload'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    expect(setUploadResult).toHaveBeenCalledTimes(1);
    expect(setUploadResult).toHaveBeenCalledWith("Unsupported media type!");
  });
  */}

  {/* passes in CSRF token -- how to test? */}
  // test('passes in CSRF token', () => {
    
  // });
});

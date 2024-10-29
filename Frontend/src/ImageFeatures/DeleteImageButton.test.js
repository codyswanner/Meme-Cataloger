import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import filterSocket from '../SupportingModules/FilterSocket';
import DeleteImagesButton from './DeleteImagesButton';

jest.mock('../SupportingModules/FilterSocket', () => ({
  onOpen: jest.fn(),
  onClose: jest.fn(),
  send: jest.fn(),
  close: jest.fn(),
  sendMessage: jest.fn()
}));


describe('DeleteImageButton', () => {

  test('deletes one image, imageView context', () => {
    const id = 1;
    render(
      <DeleteImagesButton
        imageIds={id}
      />
    );

    fireEvent(
      screen.getByRole('button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    const expectedMessage = {
      'type': 'deleteImages',
      'imageIds': id
    };
    expect(filterSocket.sendMessage).toHaveBeenCalledTimes(1);
    expect(filterSocket.sendMessage)
      .toHaveBeenLastCalledWith(expectedMessage);
  });

  test('deletes one image, mainView context', () => {
    const id = 21;
    const handleDeleteClick = jest.fn();

    render(
      <DeleteImagesButton
        handleClickInContext={handleDeleteClick}
        imageIds={id}
      />
    );

    fireEvent(
      screen.getByRole('button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    const expectedMessage = {
      'type': 'deleteImages',
      'imageIds': id
    };

    expect(filterSocket.sendMessage).toHaveBeenCalledTimes(1);
    expect(filterSocket.sendMessage)
      .toHaveBeenLastCalledWith(expectedMessage);
    expect(handleDeleteClick).toHaveBeenCalledTimes(1);
  });

    test('deletes one image, mainView context', () => {
    const id = [12, 34, 56];
    const handleDeleteClick = jest.fn();

    render(
      <DeleteImagesButton
        handleClickInContext={handleDeleteClick}
        imageIds={id}
      />
    );

    fireEvent(
      screen.getByRole('button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true
      })
    );

    const expectedMessage = {
      'type': 'deleteImages',
      'imageIds': id
    };

    expect(filterSocket.sendMessage).toHaveBeenCalledTimes(1);
    expect(filterSocket.sendMessage)
      .toHaveBeenLastCalledWith(expectedMessage);
    expect(handleDeleteClick).toHaveBeenCalledTimes(1);
  });
});

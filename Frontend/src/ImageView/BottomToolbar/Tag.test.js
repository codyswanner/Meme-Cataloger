import React from 'react';
import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import { createTheme, alpha } from "@mui/material";

import AppDataContext from '../../SupportingModules/AppDataContext';
import Tag from "./Tag";


describe('Tag', () => {
    let appData;
    let mockTheme;

    beforeEach(() => {
        // set up appData values
        appData = {
            "imageData": [], // not used by this test
            "tagData": [
                    {"id": 10, "name": "Favorites", "owner": 1},
                    {"id": 12, "name": "Star Wars", "owner": 1},
                    {"id": 13, "name": "Dad Jokes", "owner": 1},
                ],
            "imageTagData": [
                {"id": 16, "image_id": 8, "tag_id": 10},
                {"id": 19, "image_id": 5, "tag_id": 12},
                {"id": 20, "image_id": 5, "tag_id": 13},
                {"id": 21, "image_id": 9, "tag_id": 12},
                {"id": 30, "image_id": 20, "tag_id": 13},
            ]
        };

        // Tag uses a theme prop for styling
        mockTheme = createTheme({
            palette: {
                primary: {
                main: alpha('#333333', 0.6),
                }
            }
        });
    });

    test('renders correctly for no value given', () => {
        render(
            <AppDataContext.Provider value={{appData}}>
                <Tag imageTag={0} theme={mockTheme}/>
            </AppDataContext.Provider>
        );
        expect(screen.getByText(/Add Tag/)).toBeInTheDocument();
    });

    test('renders correctly for valid tag ID given', () => {
        render(
            <AppDataContext.Provider value={{appData}}>
                <Tag imageTag={16} theme={mockTheme}/>
            </AppDataContext.Provider>
        );
        expect(screen.getByText(/Favorites/)).toBeInTheDocument();
    });

    test('handles incorrect tag ID', () => {
        // Not currrently impletemented -- but this should be figured out!
    });
});

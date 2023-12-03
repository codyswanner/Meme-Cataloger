import React from 'react';
import ContentFrame from './ContentFrame'
import { createTheme } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import axios from 'axios';

const fetchImages = async () => {
  const response = await axios.get('/api/image');
  const imageDataList = [];

  response.data.forEach(responseData => {
    const imageId = responseData.id;
    const imageSource = responseData.source;
    const imageData = {id: imageId, source: imageSource, tags: []};
    imageDataList.push(imageData);
  });

  return imageDataList;
};

const fetchTags = async () => {
  const response = await axios.get('api/tag');
  const tagData = response.data;

  return tagData;
}

const fetchImageTags = async (imageDataList) => {
  const response = await axios.get('api/image-tag');
  
  response.data.forEach(imageTagData => {
    const imageId = imageTagData['image_id'];
    const tagId   = imageTagData['tag_id'];
    imageDataList.find(imageData => imageData.id === imageId).tags.push(tagId);
  })

  return imageDataList;
}

// fetchImages function grabs the URLs for the pictures themselves
let raw_pictures = await fetchImages();

// fetchTags function grabs the list of all created tags
let tagsArray = await fetchTags();

// fetchImageTags function assigns appropriate tags to pictures; the result is used in the MainContentArea component
let pictures = await fetchImageTags(raw_pictures);

let apiData = [pictures, tagsArray];

// createTheme sets background color
const theme = createTheme({
  palette: {
    background: {
      default: '#666666',
    },
  },
});

function App() {

  return (
    <ThemeProvider theme={theme}>
      <ContentFrame data={apiData}/>
    </ThemeProvider>
  );
}

export default App;

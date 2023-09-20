import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import PictureFrame from './PictureFrame';
import ReactivePictureFrame from './ReactivePictureFrame';


const apiData = []

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

let pictures;
let tagsArray;
pictures = await fetchImages();
tagsArray = await fetchTags();
pictures = await fetchImageTags(pictures);


function MainContent() {
  return (
    <div className='flex-container'>
      <ImageList variant='masonry' cols={4} gap={4}>
        {pictures.map((pic) => {
          return (
            <ImageListItem key={pictures.indexOf(pic)}>
              <ReactivePictureFrame
                src={pic.source}
                maxWidth={400}
                toolbarMaxHeight={352}
                key={pictures.indexOf(pic)}
                tags={pic.tags}
                tagNames={tagsArray}
                index={pictures.indexOf(pic)}/>
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
}

export default MainContent;
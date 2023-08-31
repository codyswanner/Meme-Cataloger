import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import PictureFrame from './PictureFrame';

const fetchImages = async () => {
  const response = await axios.get('/api/image');
  const imageSources = [];

  response.data.forEach(imageData => {
    const source = imageData.source;
    imageSources.push(source);
  });

  return imageSources;
};

let pictures
pictures = await fetchImages();


function MainContent() {
  return (
    <div className='flex-container'>
      <ImageList variant='masonry' cols={4} gap={4}>
        {pictures.map((pic) => {
          return (
            <ImageListItem key={pictures.indexOf(pic)}>
              <PictureFrame src={pic} maxWidth={400} toolbarMaxHeight={352} key={pictures.indexOf(pic)} tag={'tag'} index={pictures.indexOf(pic)}/>
            </ImageListItem>  
          );
        })}
      </ImageList>
    </div>
  );
}

export default MainContent;
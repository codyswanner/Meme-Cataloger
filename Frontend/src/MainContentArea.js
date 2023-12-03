import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ReactivePictureFrame from './ReactivePictureFrame';


// const fetchImages = async () => {
//   const response = await axios.get('/api/image');
//   const imageDataList = [];

//   response.data.forEach(responseData => {
//     const imageId = responseData.id;
//     const imageSource = responseData.source;
//     const imageData = {id: imageId, source: imageSource, tags: []};
//     imageDataList.push(imageData);
//   });

//   return imageDataList;
// };

// const fetchTags = async () => {
//   const response = await axios.get('api/tag');
//   const tagData = response.data;

//   return tagData;
// }

// const fetchImageTags = async (imageDataList) => {
//   const response = await axios.get('api/image-tag');
  
//   response.data.forEach(imageTagData => {
//     const imageId = imageTagData['image_id'];
//     const tagId   = imageTagData['tag_id'];
//     imageDataList.find(imageData => imageData.id === imageId).tags.push(tagId);
//   })

//   return imageDataList;
// }

// // fetchImages function grabs the URLs for the pictures themselves
// let raw_pictures = await fetchImages();

// // fetchTags function grabs the list of all created tags
// let tagsArray = await fetchTags();

// // fetchImageTags function assigns appropriate tags to pictures; the result is used in the MainContentArea component
// let pictures = await fetchImageTags(raw_pictures);




function MainContentArea(props) {

  let pictures = props.data[0];
  let tagsArray = props.data[1];
  
  const [viewportwidth, setViewportWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex-container'>
      <ImageList variant='masonry' cols={4} gap={4}>
        {pictures.map((pic) => {
          return (
            <ImageListItem key={pictures.indexOf(pic)}>
              <ReactivePictureFrame
                src={pic.source}
                maxWidth={viewportwidth * 0.2}
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

export default MainContentArea;
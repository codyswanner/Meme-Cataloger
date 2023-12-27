import React, { useState, useEffect } from 'react';
import ImageList from '@mui/material/ImageList'
import ImageListItem from '@mui/material/ImageListItem'
import ReactivePictureFrame from './ReactivePictureFrame';


function MainContentArea(props) {

  let pictures = props.data[0];
  let tagsArray = props.data[1];
  
  // Move to App or ContentFrame?
  const [viewportwidth, setViewportWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);


  return (
    <div className='flex-container'>
      <ImageList variant='masonry' cols={4} gap={4}> {/* Change cols based on screen width */}
        {pictures.map((pic) => {
          return (
            <ImageListItem key={pictures.indexOf(pic)}>
              <ReactivePictureFrame
                src={pic.source}
                maxWidth={viewportwidth * 0.2} // Change based on screen size
                toolbarMaxHeight={352} // Change based on screen size?
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
import React, { useState, useEffect, useContext } from 'react';
import { ImageList, ImageListItem } from '@mui/material'

import ReactivePictureFrame from './ImageFrame/ReactivePictureFrame';
import AppDataContext from './SupportingModules/AppDataContext';


function MainContentArea() {
  const appData = useContext(AppDataContext);
  
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
        {appData[0].map((pic) => { // appData[0] is the image array
          return (
            <ImageListItem key={pic.id}>
              <ReactivePictureFrame
                src={pic.source}
                description = {pic.description}
                maxWidth={viewportwidth * 0.2} // Change based on screen size
                toolbarMaxHeight={352} // Change based on screen size?
                tags={pic.tags}
                id={pic.id}
              />
            </ImageListItem>
          );
        })}
      </ImageList>
    </div>
  );
};

export default MainContentArea;

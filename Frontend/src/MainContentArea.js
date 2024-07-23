import React, { useState, useEffect, useContext } from 'react';
import { ImageList, ImageListItem } from '@mui/material'

// import ReactivePictureFrame from './ImageFrame/ReactivePictureFrame';
import Thumbnail from './Thumbnail';
import AppDataContext from './SupportingModules/AppDataContext';


/**
 * Area for images to be displayed in the app.
 * 
 * @returns The MainContentArea component to be rendered in the app.
 */
function MainContentArea() {
  // Image, Tag, and ImageTag data
  const appData = useContext(AppDataContext);
  
  // We do want MainContentArea to resize, but not LeftDrawer,
  // so the resizing logic lives here.
  const [viewportwidth, setViewportWidth] = useState(window.innerWidth);
  useEffect(() => {
    const handleResize = () => setViewportWidth(window.innerWidth);
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className='flex-container'>
      <ImageList cols={3} gap={1}> {/* Future: change cols based on screen width */}
        {appData[0].map((pic) => { // appData[0] is the image array
          return (
            <ImageListItem key={pic.id}>
              <Thumbnail
                src={pic.source}
                description = {pic.description}
                // maxWidth={viewportwidth * 0.2} // Future: change based on screen size
                toolbarMaxHeight={352} // Future: change based on screen size?
                imageTags={pic.imageTags}
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

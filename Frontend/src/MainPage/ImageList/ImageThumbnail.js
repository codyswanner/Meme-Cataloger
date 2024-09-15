import React from 'react';


export default function ImageThumbnail(props){

  return(
    <a href={"http://" + window.location.host + "/image/" + props.id}>
      <div style={props.containerStyles} data-testid={'video-thumbnail'}>
        <img src={props.src} style={props.thumbnailStyles}/>
      </div>
    </a>
  );
};

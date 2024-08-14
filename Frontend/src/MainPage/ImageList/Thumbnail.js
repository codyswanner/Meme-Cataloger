import React from 'react';


function Thumbnail(props) {

  const containerStyles = {
    aspectRatio: 1/1,  // ensure square thumbnails
    width: "98%",
    overflow: "hidden"
  }

  const thumbnailStyles = {
    display: "block",
    width: "100%",
    height: "100%",
    objectFit: "cover"
  }


  return(
    <a href={"http://" + window.location.host + "/image/" + props.id}>
    <div style={containerStyles}>
      <img src={props.src} style={thumbnailStyles}/>
    </div>
    </a>
  )
};

export default Thumbnail;

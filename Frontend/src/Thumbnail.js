import React, { useState } from 'react';
import { css } from '@emotion/css';


const containerStyles = {
  height: 200,
  width: 200,
  overflow: "hidden"
}

const thumbnailStyles = {
  display: "block",
  width: "100%",
  height: "100%",
  objectFit: "cover"
}

function Thumbnail(props) {

  return(
    <a href={"http://" + window.location.host + "/image/" + props.id}>
    <div style={containerStyles}>
      <img src={props.src} style={thumbnailStyles}/>
    </div>
    </a>
  )
};

export default Thumbnail;

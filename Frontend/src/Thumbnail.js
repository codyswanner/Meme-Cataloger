import React, { useState } from 'react';


function Thumbnail(props) {
  return(
    <a href={"http://" + window.location.host + "/image/" + props.id}>
      <img src={props.src} style={{ maxWidth: 200 }}/>
    </a>
  )
};

export default Thumbnail;

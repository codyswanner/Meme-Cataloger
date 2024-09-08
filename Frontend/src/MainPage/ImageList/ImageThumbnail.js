import React from 'react';


export default function ImageThumbnail(props){
    const {containerStyles, thumbnailStyles} = props.styles;

    return(
      <a href={"http://" + window.location.host + "/image/" + props.id}>
      <div style={containerStyles}>
        <img src={props.src} style={thumbnailStyles}/>
      </div>
      </a>
    );
};


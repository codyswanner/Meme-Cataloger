import React, { useContext } from 'react';
import styled from '@emotion/styled';

import useFirstFrame from './useFirstFrame';
import AppDataContext from '../../SupportingModules/AppDataContext';


export default function Thumbnail(props) {
  const { appState } = useContext(AppDataContext);

  const selected = appState.selectedItems.includes(props.id) ? true : false;

  const videoFileTypesRegex = /.+\.(mp4|mov|avi|mkv|wmv|flv|webm)/i;
  const imageFileTypesRegex = /.+\.(jpg|jpeg|png|webp|gif|bmp|svg)/i;

  const ThumbnailImg = styled.img`
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: ${selected ? '0.6' : ''};

    &:hover{opacity:0.8;};
  `;

  const ThumbnailContainer = styled.div`
    aspect-ratio: 1/1;
    width: 98%;
    overflow: hidden;
    background-color: ${selected ? 'rgba(75, 95, 255, 0.6)' : ''};
    padding: ${selected ? '0.9rem' : ''};
  `;

  if (videoFileTypesRegex.test(props.src)) {
    const firstFrame = useFirstFrame(props.src);
    return(
      <a href={"http://" + window.location.host + "/image/" + props.id}>
        <ThumbnailContainer data-testid={'video-thumbnail'}>
            {firstFrame&&<ThumbnailImg src={firstFrame}/>}
        </ThumbnailContainer>
      </a>
    );
  } else if (imageFileTypesRegex.test(props.src)) {
    return(
      <a href={"http://" + window.location.host + "/image/" + props.id}>
        <ThumbnailContainer data-testid={'img-thumbnail'}>
          <ThumbnailImg src={props.src}/>
        </ThumbnailContainer>
      </a>
    );
  } else {
    console.error(`Source ${props.src} does not match expected file types`);
  };
};

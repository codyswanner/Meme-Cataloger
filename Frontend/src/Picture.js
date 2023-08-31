import React from 'react';

function Picture(props) {
  return (
    <div className={props.className}>
      <img src={props.src} style={{ maxWidth: props.maxWidth }} alt="" />
    </div>
  );
}

export default Picture;

/**
* This module adapted from react-virtuoso docs
* https://virtuoso.dev/grid-responsive-columns/
*/

import React, { forwardRef } from 'react';
import { VirtuosoGrid } from 'react-virtuoso';

import Thumbnail from './Thumbnail';


// Ensure that this stays out of the component, 
// Otherwise the grid will remount with each render due to new component instances.
const gridComponents = {
  List: forwardRef(({ style, children, ...props }, ref) => (
    <div
      ref={ref}
      {...props}
      style={{
        display: "flex",
        flexWrap: "wrap",
        ...style,
      }}
    >
      {children}
    </div>
  )),
  Item: ({ children, ...props }) => (
    <div
      {...props}
      style={{
        padding: "0",
        width: "200",
        display: "flex",
        flex: "none",
        alignContent: "stretch",
        boxSizing: "border-box",
      }}
    >
      {children}
    </div>
  )
}

const ItemWrapper = ({ children, ...props }) => (
  <div
    {...props}
    style={{
      display: "flex",
      flex: 1,
      textAlign: "center",
      padding: "0.5rem 0.5rem",
      border: "0px dashed red",
      whiteSpace: "nowrap",
    }}
  >
    {children}
  </div>
);

export default function VirtualizedImageList(props) {
  return (
      <VirtuosoGrid
        style={{ height: 500 }}
        totalCount={props.imageList.length}
        components={gridComponents}
        itemContent={(index) => 
          <ItemWrapper>
            <Thumbnail src={props.imageList[index].source} id={props.imageList[index].id}/>
          </ItemWrapper>
        }
      />
  );
};

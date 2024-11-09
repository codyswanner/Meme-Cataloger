import React, { useRef } from 'react';
import styled from '@emotion/styled';


export function TagCheckbox(props) {

  const inputRef = useRef(null);

  const handleLabelClick = () => {
    console.log('The label was clicked!');
    if (inputRef.current.checked) {
      inputRef.current.checked = false;
    } else {
      inputRef.current.checked = true;
    };
  };

  return(
    <>
      <input
        type='checkbox'
        name={props.tagId}
        value={props.tagName}
        ref={inputRef}
      />
      <label for={props.tagId} onClick={handleLabelClick}>
        {props.tagName}
      </label>

      <br/>
    </>
  );
};

export default function ApplyTagsPopper(props) {

  const TagsDialog = styled.dialog`
    position: absolute;
    left: -250px;
    top: 52px;
    width: 300px;
  `;

  return(
    <TagsDialog open={props.open}>
      <form>
        <TagCheckbox tagName={"This is a fake tag"} tagId={1}/>

        <TagCheckbox tagName={"But will be real someday"} tagId={2}/>
      </form>
    </TagsDialog>
  );
};


/*

Okay, what else does this need...

1. Communications with backend (websocket)
2. Way to determine applied tags on selected images (sounds complicated)
3. Controls that work in concert with #2
4. Search functionality
5. "Create new tag" functionality
6. Submit/Apply button? (would make sense with the form tag)
7. Better styling! (This looks like shit right now)
8. Tests
9. A way to temporarily store selections in this menu (until submitted)
10. Undo/reset option overall
11. Undo/reset option per tag? (kind of edge case but I can see it...)

(Realized around point #4 that this is gonna need to be multiple components)

Components (subject to change)
1. outer dialog box
2. individual tag checkboxes (w/ labels, etc)
3. selection info storage + backend communication (together? yeah?)
  Idk maybe only comms will get wrapped up and storage stays w/ #1
  (Am I just describing FilterSocket?)
4. Styling? (may also stay with #1)
5. Search box
6. tests

That seems like enough for now, I'm sure there will be more to dig into,
but at some point I have to stop thinking and start doing.
Hey self, go make this an actual GitHub issue!
(Issue #165 is already relevant for this, added it there!)

*/

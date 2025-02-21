/**
 * Used by the app to send and receive WebSocket messages.
 * All received WS messages are processed through useFilterSocket module.
 * WebSocket messages are sent with filterSocket in the following modules:
 * 
 * (Module, message type[, purpose])
 * AddTagPopper, addTag, create new tag association on an image (ie, imageTag)
 * DeleteImageButton, deleteImage
 * ImageTopToolbar, updateDescription, update an image description
 * Tag, removeTag, remove tag from image when tag is clicked
 * FilterCheckBox, filterChange, enable/disable an image search filter
 */
const filterSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/filter-socket/'
);

filterSocket.onopen = () => {
    console.log('FilterSocket connected!');
    filterSocket.send(JSON.stringify({
        'type': 'message',
        'message': 'FilterSocket Connected!'
    }));
};

filterSocket.onclose = function() {
    console.log('Filter socket has closed unexpectedly');
};

filterSocket.sendMessage = function(message) {
    filterSocket.send(JSON.stringify(message));
};

export default filterSocket;

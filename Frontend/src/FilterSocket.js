// Will need a way to match client with corresponding backend consumer.

const filterSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/connection/path/here/'
);

filterSocket.onopen = () => {
    console.log('FilterSocket connected!');
    filterSocket.send(JSON.stringify({'type': 'message', 'message': 'FilterSocket Connected!'}));
};

// Also probably in this module: send message about filters, receive info to apply filters

filterSocket.onclose = function(e) {
    console.error('Filter socket has closed unexpectedly')
};

export default filterSocket;

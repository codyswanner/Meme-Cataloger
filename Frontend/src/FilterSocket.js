// Will need a way to match client with corresponding backend consumer.

const filterSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/connection/path/here/'
);

filterSocket.onopen = () => {
    filterSocket.send(JSON.stringify({'message': 'FilterSocket connected!'}));
};

// Also probably in this module: send message about filters, receive info to apply filters

filterSocket.onclose = function(e) {
    console.error('Filter socket has closed unexpectedly')
};

export default filterSocket;

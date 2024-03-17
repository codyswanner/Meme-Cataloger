// Will need a way to match client with corresponding backend consumer.

const filterSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/connection/path/here/'
);

filterSocket.onopen = () => {
    console.log('FilterSocket connected!');
    filterSocket.send(JSON.stringify({'type': 'message', 'message': 'FilterSocket Connected!'}));
};

filterSocket.onclose = function(e) {
    console.log('Filter socket has closed unexpectedly')
};

export default filterSocket;

const filterSocket = new WebSocket(
    'ws://' + window.location.host + '/ws/filter-socket/'
);

filterSocket.onopen = () => {
    console.log('FilterSocket connected!');
    filterSocket.send(JSON.stringify({'type': 'message', 'message': 'FilterSocket Connected!'}));
};

filterSocket.onclose = function(e) {
    console.log('Filter socket has closed unexpectedly')
};

export default filterSocket;

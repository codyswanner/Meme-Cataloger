import React from 'react';
import jQuery from 'jquery';


export function sendCSRFRequest(formData, targetURL) {
    const data = formData;
    const request = new XMLHttpRequest();
    request.open('POST', targetURL);
    request.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
    request.send(data);
};

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            };
        };
    };
    return cookieValue;
};

const CSRFToken = () => {
    return (<input type="hidden" name="csrfmiddlewaretoken" value={getCookie('csrftoken')} />);
};

export default CSRFToken;

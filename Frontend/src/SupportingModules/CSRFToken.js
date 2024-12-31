import React from 'react';


/**
 * Sends a request with CSRF data.
 * Currently only used by UploadForms for image upload requests.
 * 
 * @param {FormData} formData From the image upload request
 * @param {String} targetURL Usually 'upload/', see api.urls and api.views for details
 */
export async function sendCSRFRequest(formData, targetURL) {
        const response = await fetch(targetURL, {
            method: "POST",
            body: formData,
            headers: {
                'X-CSRFToken': getCookie('csrftoken'),
                'User-ID': '1'  // Will need to be passed in
            }
        });
        if (response.ok) {
            console.log("Success!");
        } else if (response.status == 400) {
            throw new Error("User ID not provided!");
        } else if (response.status == 401) {
            throw new Error("User ID not recognized!");
        } else if (response.status == 415) {
            throw new Error("Unsupported media type!");
        } else if (response.status == 500) {
            throw new Error("Server Error!");
        } else {
            throw new Error("Unforeseen error!");
        };
};

/**
 * Used to get a value of a session cookie.
 * Currntly only used to get the csrftoken for the session, for image upload requests.
 * CSRF cookie set in Frontend.views module; for more details see link to Django docs
 * https://docs.djangoproject.com/en/5.0/howto/csrf/
 * 
 * @param {String} name Name of the cookie to get; usually 'csrftoken'.
 * @returns value of the cookie requested (usually csrftoken).
 */
function getCookie(name) {
    var cookieValue = null;
    // This code taken from Django explainer on using CSRF in Django
    // https://docs.djangoproject.com/en/5.0/howto/csrf/
    if (document.cookie && document.cookie !== '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            const cookie = cookies[i].trim();
            if (cookie.substring(0, name.length + 1) === (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            };
        };
    };
    return cookieValue;
};

/**
 * Returns an input element to be inserted into forms for CSRF compliance.
 * Currently only used by UploadForms module.
 * 
 * @returns Element with CSRF token for form submission.
 */
const CSRFToken = () => {
    return (<input type="hidden" name="csrfmiddlewaretoken" value={getCookie('csrftoken')} />);
};

export default CSRFToken;

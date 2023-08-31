import React, { useState, useEffect } from 'react';
import axios from 'axios';

const fetchImage = async (picture) => {
    const response = await axios.get('/api/image');
    picture = response.data[0].source;
    
    return picture; 
};

let pic_00;
pic_00 = await fetchImage(pic_00);

function TestPictureComponent() {
    return (
        <div>
            <img src={pic_00}/>
        </div>
    );
};

export default TestPictureComponent;
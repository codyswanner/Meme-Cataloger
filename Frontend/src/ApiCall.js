import axios from 'axios';

async function ApiCall() {

  const fetchImages = async () => {
    const response = await axios.get('/api/image');
    const imageDataList = [];

    response.data.forEach(responseData => {
      const imageId = responseData.id;
      const imageSource = responseData.source;
      const imageData = {id: imageId, source: imageSource, tags: []};
      imageDataList.push(imageData);
    });

    return imageDataList;
  };

  const fetchTags = async () => {
    const response = await axios.get('api/tag');
    const tagData = response.data;

    return tagData;
  }

  const fetchImageTags = async () => {
    const response = await axios.get('api/image-tag');
    const imageTagData = response.data;

    return imageTagData;
  }

  const assignImageTags = async (imageDataList, imageTagData) => {
    imageTagData.forEach(imageTagData => {
      const imageId = imageTagData['image_id'];
      const tagId   = imageTagData['tag_id'];
      imageDataList.find(imageData => imageData.id === imageId).tags.push(tagId);
    })

    return imageDataList;
  }

  // fetchImages function grabs the URLs for the pictures themselves
  let raw_pictures = await fetchImages();

  // fetchTags function grabs the list of all created tags
  let tagsArray = await fetchTags();

  let imageTagData = await fetchImageTags();

  // assignImageTags function assigns appropriate tags to pictures; 
  // the result is used in the MainContentArea component
  let picturesArray = await assignImageTags(raw_pictures, imageTagData);

  let imageTagsArray = await fetchImageTags();

  let apiData = [picturesArray, tagsArray, imageTagsArray];

  console.log(apiData)

  return apiData;

}

export default ApiCall;
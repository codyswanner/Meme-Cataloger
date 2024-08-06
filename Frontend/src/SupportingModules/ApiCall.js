import axios from 'axios';


/**
 * Returns ApiData -- includes images, tags, and their associations.
 * 
 * @returns {Array} ApiData -- Initial data for the app
 */
export default async function ApiCall() {

  axios.defaults.baseURL = window.location.origin

  const fetchImages = async () => {
    // Fetch Image data from API/backend
    const response = await axios.get('/api/image');
    const imageDataList = [];  // We'll fill this array in a second

    // For each Image, record the id, source, and description,
    // Then push to the imageDataList.
    response.data.forEach(responseData => {
      const imageData = {
        id: responseData.id,
        source: responseData.source,
        description: responseData.description,
        imageTags: []  // will be filled later
      };
      imageDataList.push(imageData);
    });

    // This goes back to the main function for further processing.
    return imageDataList;
  };

  const fetchTags = async () => {
    // Fetch Tag data from API/backend
    const response = await axios.get('api/tag');
    return response.data;
  };

  const fetchImageTags = async () => {
    // Fetch ImageTag data from API/backend
    // "ImageTag" refers to an association between an image and a tag.
    // See the api.models module for more details.
    const response = await axios.get('api/image-tag');
    return response.data;
  };

  /**
   * Attaches imageTag data to each image in the ImageDataList.
   * 
   * @param {Array} imageDataList id, source(filepath) and desc for each image.
   * @param {Array} imageTagData List of associations between images and tags.
   * @returns modified imageDataList; each Image now has tag association (imageTag) data attached.
   */
  const assignImageTags = async (imageDataList, imageTagData) => {
    // Assign each imageTag to it's image
    imageTagData.forEach(imageTagData => {
      const imageId = imageTagData['image_id'];
      const imageTagId = imageTagData['id']; // Find unique imageTag ids
      // Append unique imageTag data to image
      imageDataList.find(imageData => imageData.id === imageId).imageTags.push(imageTagId);
      // imageDataList.find(imageData => imageData.id === imageId).tags.push(tagId);
    });

    // Send back the modified imageDataList, now with imageTag data
    return imageDataList;
  };

  // fetchImages function grabs id, source(filepath) and desc for each image
  let raw_pictures = await fetchImages();

  // fetchTags function grabs the list of all created tags
  let tagsArray = await fetchTags();

  // fetchImageTags grabs the data that matches tags to images
  let imageTagsArray = await fetchImageTags();

  // assignImageTags function assigns appropriate tags to pictures; 
  // the result is used in the MainContentArea component
  let picturesArray = await assignImageTags(raw_pictures, imageTagsArray);

  // Full complement of data needed for initial page load
  let apiData = {
      imageData: picturesArray,
      tagData: tagsArray,
      imageTagData: imageTagsArray
    };

  // Returns to index.js to be used in various pieces of the app
  return apiData;
};

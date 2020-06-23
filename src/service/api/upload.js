import axios from 'axios';

const urls = {
  uploadImages: '/api/upload/images',
};

const upload = {
  async image(file) {
    let formData = new FormData();

    formData.append('image', file);

    return axios.post(urls.uploadImages, formData);
  },

  _setTokenToAxios(token) {
    axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  },
};

export default upload;

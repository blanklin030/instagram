import Request from '../assets/utils/request';

export default {
  upload(params) {
    const config = { 
      headers: { 
        "Content-Type": "multipart/form-data" 
      }
    }
    return Request.Post('/file/upload', params, config);
  },
};

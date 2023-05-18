import axios from "axios";
import AuthService from "../services/auth.service";
import {API_ROOT} from "../common/ShareVariable";

const authToken = AuthService.getAuthToken();

const shareVideo = (url) => {
  return axios.post(API_ROOT + "videos", {
    url: url,
  }, {
    headers:{
      'Authorization': `${authToken}`
    }
  });
};

const getVideos = (page = 1, perPage = 10) => {
  return axios
    .get(API_ROOT + "videos", {
      params: {
        page: page,
        per_page: perPage
      }
    }, {
      headers: {
        'Authorization': `${authToken}`
      }
    })
    .then((response) => {
      return response.data;
    });
};


const VideoService = {
  shareVideo,
  getVideos,
}

export default VideoService;

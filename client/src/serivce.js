import axios from "axios";

// const baseUrl = "http://localhost:8001";

// const axios = Axios.create({
//   baseUrl,
// });

axios.interceptors.request.use(
  (req) => {
    console.log(req);
    return req;
  },
  (error) => {
    return Promise.reject(error);
  }
);
axios.interceptors.response.use(
  (res) => {
    console.log(res);
    return res;
  },
  (error) => {
    console.dir(error);
    return Promise.reject(error);
  }
);

class ApiService {
  getRecipes() {
    return axios.get("http://localhost:8001").then((res) => res.data);
  }
}

export default new ApiService();

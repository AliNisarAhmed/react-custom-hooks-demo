import axios from 'axios';

const API = {
  getData(query: any) {
    return axios.get(`https://hn.algolia.com/api/v1/search?query=${query}`)
      .then(res => res.data);
  }
}

export default API;
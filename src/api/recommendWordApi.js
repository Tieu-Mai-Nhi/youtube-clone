import axios from 'axios';

const recommendWordApi = {
    get(text) {
        const url = `http://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=${text}`;
        // console.log(url);
        return axios.get(url)
    }
}

export default recommendWordApi;
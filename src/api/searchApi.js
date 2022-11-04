import axiosClient from "./axiosClient";
const key = "AIzaSyDsDqQ3UMEMDsz9nu-ovS29cNgAwE9WKi8";
const key2 = "AIzaSyDVIZiQf6Mw1kYoqNoCaKMh6K_JYgRomeQ";

const searchApi = {
    get(keyWord) {
        const url = `/search?part=snippet&maxResults=10&q=${keyWord}&key=${key}`;
        // console.log(url);
        return axiosClient.get(url)
    }
}

export default searchApi;  
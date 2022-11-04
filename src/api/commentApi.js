import axiosClient from "./axiosClient";
const key = "AIzaSyDsDqQ3UMEMDsz9nu-ovS29cNgAwE9WKi8";
const key4 = 'AIzaSyA3WRPFprwMa2aANqP35qJQpvw7r7r1CVA';
const key2 = "AIzaSyDVIZiQf6Mw1kYoqNoCaKMh6K_JYgRomeQ";

const commentApi = {
    getComment(videoId) {
        const url = `/commentThreads?part=snippet%2Creplies&videoId=${videoId}&maxResults=10&key=${key4}`
        // console.log(url);
        return axiosClient.get(url)
    }
}

export default commentApi;
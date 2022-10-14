import axiosClient from "./axiosClient";
const key = "AIzaSyDsDqQ3UMEMDsz9nu-ovS29cNgAwE9WKi8";
const key2 = "AIzaSyDVIZiQf6Mw1kYoqNoCaKMh6K_JYgRomeQ";
const key3 = 'AIzaSyA3WRPFprwMa2aANqP35qJQpvw7r7r1CVA';

const videoApi = {
    getVideoMostPopular() {
        const url = `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=VN&key=${key}`;
        // console.log(url);
        return axiosClient.get(url)
    },
    getVideo(videoId) {
        const url = `/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${key}`
        return axiosClient.get(url)
    }
}

export default videoApi;
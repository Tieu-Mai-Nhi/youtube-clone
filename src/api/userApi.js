import axiosClient from "./axiosClient";

const baseURL = 'https://api.ezfrontend.com/auth/local/register';


const videoApi = {
    getVideoMostPopular() {
        const url = `/videos?part=snippet%2CcontentDetails%2Cstatistics&chart=mostPopular&maxResults=10&regionCode=VN&key=${key}`;
        // console.log(url);
        return axiosClient.get(url)
    },
    getVideo() {
        const url = `/videos?part=snippet%2CcontentDetails%2Cstatistics&id=${videoId}&key=${key}`
        return axiosClient.get(url)
    }
}

export default videoApi;
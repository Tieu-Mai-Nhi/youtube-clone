import axiosClient from "./axiosClient";
const key = "AIzaSyDsDqQ3UMEMDsz9nu-ovS29cNgAwE9WKi8";
const key2 = "AIzaSyDVIZiQf6Mw1kYoqNoCaKMh6K_JYgRomeQ";

const channelApi = {
    getChannel(channelId) {
        const url = `/channels?part=snippet%2CcontentDetails%2Cstatistics&id=${channelId}&maxResults=10&key=${key}`
        return axiosClient.get(url)
    }
}

export default channelApi;
import axiosClient from "./axiosClient";
const key = "AIzaSyDsDqQ3UMEMDsz9nu-ovS29cNgAwE9WKi8";
const key2 = "AIzaSyDVIZiQf6Mw1kYoqNoCaKMh6K_JYgRomeQ";

const relatedVideoApi = {
    getRelatedVideo(videoId) {
        const url = `/search?part=snippet&maxResults=10&relatedToVideoId=${videoId}&type=video&key=${key2}`;
        return axiosClient.get(url);
    },
};

export default relatedVideoApi;
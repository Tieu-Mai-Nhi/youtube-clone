import axiosClient from "./axiosClient";
const key = "AIzaSyDsDqQ3UMEMDsz9nu-ovS29cNgAwE9WKi8";
const key2 = "AIzaSyDVIZiQf6Mw1kYoqNoCaKMh6K_JYgRomeQ";
const key3 = 'AIzaSyAjJPWqSvuu7F-sDjy8kxjdWnvL2KXTGUo';
const key4 = 'AIzaSyA3WRPFprwMa2aANqP35qJQpvw7r7r1CVA';

const relatedVideoApi = {
    getRelatedVideo(videoId) {
        const url = `/search?part=snippet&maxResults=10&relatedToVideoId=${videoId}&type=video&key=${key4}`;
        return axiosClient.get(url);
    },
};

export default relatedVideoApi;
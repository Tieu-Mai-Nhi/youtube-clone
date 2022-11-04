import moment from "moment/moment";

export const showTime = (dateString) => {
    let newDate = new Date(dateString);
    let nowDate = new Date();
    const divideYear = 1000 * 60 * 60 * 24 * 30 * 12;
    const divideMonth = 1000 * 60 * 60 * 24 * 30;
    const divideDay = 1000 * 60 * 60 * 24;
    const divideHour = 1000 * 60 * 60;
    const divideMinute = 1000 * 60;

    let durationTime = nowDate.getTime() - newDate.getTime();

    if (durationTime > divideYear) {
        durationTime = Math.floor(durationTime / divideYear) + ' năm trước'
    } else if (durationTime > divideMonth) {
        durationTime = Math.floor(durationTime / divideMonth) + ' tháng trước'
    } else if (durationTime > divideDay) {
        durationTime = Math.floor(durationTime / divideDay) + ' ngày trước'
    } else if (durationTime > divideHour) {
        durationTime = Math.floor(durationTime / divideHour) + ' giờ trước'
    } else if (durationTime > divideMinute) {
        durationTime = Math.floor(durationTime / divideMinute) + ' phút trước'
    }
    // console.log(durationTime);
    return durationTime;
}

export const showView = (view) => {
    let viewString;
    if (view > 1000000) {
        viewString = (view / 1000000).toFixed(1) + 'M' + ' views';
    } else if (view > 1000) {
        viewString = (view / 1000).toFixed(1) + 'K' + ' views';
    }
    return viewString;
}

export const showLike = (like) => {
    let likeString = like;
    // if (like > 1000000) {
    //     likeString = (like / 1000000).toFixed(0) + 'M';
    // } else if (like > 10000) {
    //     likeString = (like / 10000).toFixed(0) + 'K';
    // } else if (like > 1000) {
    //     likeString = (like / 1000).toFixed(1) + 'K';
    // } else {
    //     likeString = like;
    // }
    // console.log(likeString);
    return likeString;
};

export const showSubscribe = (sub) => {
    let subString;
    if (sub > 10000000) {
        subString = (sub / 1000000).toFixed(1) + 'M subscribe';
    } else if (sub > 1000000) {
        subString = (sub / 1000000).toFixed(2) + 'M subscribe';
    } else if (sub > 1000) {
        subString = (sub / 1000).toFixed(0) + 'K subscribe';
    }
    return subString;
};

export const showComment = (comment) => {
    let commentString;
    if (comment > 1000000) {
        commentString = (comment / 1000000).toFixed(1) + 'M';
    } else if (comment > 1000) {
        commentString = (comment / 1000).toFixed(0) + 'N';
    } else {
        commentString = comment;
    }
    return commentString;
};

// thời lượng video
export const showDurationVideo = (time) => {
    let durationVideo = moment.duration(time).asSeconds();
    let hours;
    let minutes;
    let seconds;
    // console.log(typeof durationVideo);
    if (durationVideo > 3600) {
        hours = Math.floor(durationVideo / 3600);
        minutes = Math.floor((durationVideo % 3600) / 60);
        seconds = Math.floor((durationVideo % 3600) % 60);
        if (minutes < 10 && seconds > 10) {
            durationVideo = `${hours}:0${minutes}:${seconds}`;
        } else if (minutes > 10 && seconds < 10) {
            durationVideo = `${hours}:${minutes}:0${seconds}`;
        } else if (minutes < 10 && seconds < 10) {
            durationVideo = `${hours}:0${minutes}:0${seconds}`;
        } else {
            durationVideo = `${hours}:${minutes}:${seconds}`;
        }
    } else if (durationVideo > 60) {
        minutes = Math.floor((durationVideo % 3600) / 60);
        seconds = Math.floor((durationVideo % 3600) % 60);
        if (seconds > 10) {
            durationVideo = `${minutes}:${seconds}`;
        } else {
            durationVideo = `${minutes}:0${seconds}`;
        }
    }
    else {
        let time = `0:${durationVideo}`
        durationVideo = time;
    }
    return durationVideo;
}
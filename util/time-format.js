module.exports = time => {
    const hour = time / 3600 | 0;
    const minute = time % 3600 / 60 | 0;
    const second = time % 60;
    let data = "";
    if (hour != 0) data += hour + "時間";
    if (minute != 0) data += minute + "分";
    if (second != 0) data += second + "秒";
    return data;
};

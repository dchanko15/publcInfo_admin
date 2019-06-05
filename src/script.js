function formatDate(cdate) {
    let date;
    if (cdate instanceof Date)
        date = cdate;
    else
        date  = new Date(cdate)

    let hours = date.getHours();
    let minutes = date.getMinutes();


    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    let strTime = hours + ':' + minutes;
    let day = date.getDate();
    day = day < 10 ? '0' + day : day;
    let month = date.getMonth() + 1;
    month = month < 10 ? '0' + month : month;
    return day + '/' + month + "/" + date.getFullYear() + " " + strTime;
}

export {
    formatDate
}
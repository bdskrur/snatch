function format(date: Date) {
    let day: string | number = date.getDate();
    if (day < 10) {
        day = "0" + day;
    }

    let month: string | number = date.getMonth() + 1;
    if (month < 10) {
        month = "0" + month;
    }

    const year: string | number = date.getFullYear();
    let hours: string | number = date.getHours();
    if (hours < 10) {
        hours = "0" + hours;
    }

    let minutes: string | number = date.getMinutes();
    if (minutes < 10) {
        minutes = "0" + minutes;
    }

    let seconds: string | number = date.getSeconds();
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    return [year, month, day, hours, minutes, seconds];
}

export function formatTime_hh_mm_ss(data: Date) {
    return addZero(data.getHours()) + ":" + addZero(data.getMinutes()) + ":" + addZero(data.getSeconds());
}

function addZero(value: number) {
    return value < 10 ? `0${value}` : value;
}

export function formatDateForLogs(date: Date) {
    const [year, month, day, hours, minutes, seconds] = format(date);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
}

export function formatDate(date: Date) {
    const [year, month, day, hours, minutes, seconds] = format(date);
    return `${day}.${month}.${year} ${hours}:${minutes}:${seconds}`;
}

// парсит строку формата dd.mm.yyyy hh:mm:ss
export function parseDatePickerDate(stringDate: string) {
    const [date, time] = stringDate.split(" ");
    const [day, month, year] = date.split(".").map(x => Number(x));
    const [hours, minutes, seconds] = time.split(":").map(x => Number(x));
    return new Date(year, month - 1, day, hours, minutes, seconds);
}

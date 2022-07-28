export const key = process.env.REACT_APP_API_KEY;

export const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=54.578&lon=73.4001&exclude=hourly,daily&lang=ru&appid=${key}`;
export const URLWEEK = `https://api.openweathermap.org/data/2.5/forecast?lat=54.578&lon=73.4001&lang=ru&appid=${key}`;

export function convertToCells(fn: number) {
    let result;
    const condition = Math.floor(fn - 273.15);
    if (condition > 0) {
        result = "+" + condition.toString() ;
    }
    else {
        result = "-" + condition.toString();
    }
    return result;
}

export function formatRuTime(date : Date) {
    let formatter = new Intl.DateTimeFormat("ru", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric"
    });
    return formatter.format(date)
}

export function timeConverter(UNIX_timestamp : number){
    var a = new Date(UNIX_timestamp * 1000);
    var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
    var year = a.getFullYear();
    var month = months[a.getMonth()];
    var date = a.getDate();
    var time = date + ' ' + month + ' ' + year;
    return new Date(time);
}

export function convertMasTimes (mas: number[], sortedMas: Date[]) {
    if (mas.length > 0) {
        mas.forEach(elem => sortedMas.push(timeConverter(elem)));
    }
}
export function convertMasTimesRu (mas: number[], sortedMas: Date[], sortedMasRu: string []) {
    if (mas.length > 0) {
        sortedMas.forEach(elem => sortedMasRu.push(formatRuTime(elem)));
    }
}
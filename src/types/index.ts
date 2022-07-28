export type CurrentDay = {
    current:  Current;
    lat: number;
    lon: number;
    timezone: string;
    timezone_offset: number;
}

export type Current = {
    clouds: number;
    dew_point: number;
    dt: number;
    feels_like: number;
    humidity: number;
    pressure: number;
    sunrise: number;
    sunset: number;
    temp: number;
    uvi: number;
    visibility: number;
    weather: WeatherCurrent[];
}

export type WeatherCurrent = {
    description: string;
    icon: string;
    id: number;
    main: string;
}

export type Week = {
    city: WeekCity;
    cnt: number;
    cod: string;
    list: WeekList[];
    message: 0;
}

export type WeekCity = {
    coord: { lat: number, lon: number };
    country: string;
    id: number;
    name: string;
    population: number;
    sunrise: number;
    sunset: number;
    timezone: number;
}

export type WeekList = {
    clouds: { all: number };
    dt: number;
    dt_txt: string;
    main: WeekListMain;
    pop: number;
    rain: { "3h": number };
    sys: { pod: string };
    visibility: number;
    weather: WeatherCurrent[];
    wind:  { speed: number, deg: number, gust: number }
}

export type WeekListMain = {
    feels_like: number;
    grnd_level: number;
    humidity: number;
    pressure: number;
    sea_level: number;
    temp: number;
    temp_kf: number;
    temp_max: number;
    temp_min: number;
}
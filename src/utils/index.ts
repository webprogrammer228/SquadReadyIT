import axios from 'axios';
import React from 'react';

export const key = process.env.REACT_APP_API_KEY;
export const URL = `https://api.openweathermap.org/data/2.5/onecall?lat=54.578&lon=73.4001&exclude=hourly,daily&lang=ru&appid=${key}`;
export const URLWEEK = `https://api.openweathermap.org/data/2.5/forecast?lat=54.578&lon=73.4001&lang=ru&appid=${key}`;

export async function getData<T>(url: string, setter: React.Dispatch<React.SetStateAction<T>>) {
  const response = await axios.get(url);
  const data = await response.data;
  setter(data);
}

export function convertToCells(fn: number) {
  let result;
  const condition = Math.floor(fn - 273.15);
  if (condition > 0) {
    result = `+${condition.toString()}`;
  } else {
    result = `-${condition.toString()}`;
  }
  return result;
}

export function formatRuTime(date: Date) {
  const formatter = new Intl.DateTimeFormat('ru', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  return formatter.format(date);
}

export function timeConverter(unixTimestamp: number) {
  const a = new Date(unixTimestamp * 1000);
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];
  const year = a.getFullYear();
  const month = months[a.getMonth()];
  const date = a.getDate();
  const time = `${date} ${month} ${year}`;
  return new Date(time);
}

export function convertMasTimes(mas: number[]) {
  const newMas: Date[] = [];
  if (mas.length > 0) {
    mas.map((elem) => newMas.push(timeConverter(elem)));
    return newMas;
  }
  return newMas;
}

export function convertMasTimesRu(mas: Date[]) {
  const sortedMasRu: string[] = [];
  if (mas.length > 0) {
    mas.map((elem) => sortedMasRu.push(formatRuTime(elem)));
    return sortedMasRu;
  }
  return sortedMasRu;
}

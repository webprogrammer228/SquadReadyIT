import React, {useCallback, useEffect, useState} from 'react';
import {convertMasTimes, convertMasTimesRu, convertToCells, formatRuTime, URL, URLWEEK} from "../utils";
import axios from "axios";
import {CurrentDay, Week, WeekList} from "../types";
import styled from "styled-components";
import Loader from "./Loader";

const timer =
    setInterval(() => {
        console.log("Данные обновились")
    }, 60000)

const WeatherBlock = () => {
    const [data, setData] = useState<CurrentDay>();
    const [weekData, setWeekData] = useState<Week>();

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(URL);
            const data = await response.data;
            setData(data);
        }
        getData().catch(e => console.log(e));
    }, [timer])

    useEffect(() => {
        const getData = async () => {
            const response = await axios.get(URLWEEK);
            const data = await response.data;
            setWeekData(data);
        }
        getData().catch(e => console.log(e));
    }, [timer])

    const allWeekMas: WeekList[] = [];
    let mas: number[] = [];
    let sortedMas: Date[] = [];
    let sortedMasRu: string[] = [];

    navigator.geolocation.watchPosition(position => console.log(position.coords.altitude))

    const getAllElems = () => {
        if (weekData) {
            for (let i = 0; i < weekData.list.length; i++) {
                if (i % 8 === 0) {
                    mas.push(weekData.list[i].dt);
                    allWeekMas.push(weekData.list[i]);
                }
            }
        }
    }

    getAllElems();
    convertMasTimes(mas, sortedMas);
    convertMasTimesRu(mas, sortedMas, sortedMasRu);
    return (

            <Wrapper>
                {!data || !weekData ? <Loader /> :
                    <>
                <CurrentDayBlock>
                    <CityBlock>
                        <City>Омск</City>
                    </CityBlock>
                    <>
                        <CurrentDayInfo>
                            <CurrentDayInfo>{data && data.current.weather[0].description}</CurrentDayInfo>
                            <CurrentDayInfo><img src={`https://openweathermap.org/img/wn/${data && data.current.weather[0].icon}@2x.png`} alt="weather"></img></CurrentDayInfo>
                        </CurrentDayInfo>
                        <CurrentDayInfoBlock>
                            <CurrentDayInfo>День недели / дата</CurrentDayInfo>
                             <CurrentDayInfo>{formatRuTime(new Date())}</CurrentDayInfo>
                        </CurrentDayInfoBlock>
                        <CurrentDayInfoBlock>
                           <CurrentDayInfo>Текущая температура</CurrentDayInfo>
                           <CurrentDayInfo>{(data && convertToCells(data.current.temp))}</CurrentDayInfo>
                        </CurrentDayInfoBlock>
                        <CurrentDayInfoBlock>
                            <CurrentDayInfo>Ощущается как:</CurrentDayInfo>
                            <CurrentDayInfo>{(data && convertToCells(data.current.feels_like))}</CurrentDayInfo>
                        </CurrentDayInfoBlock>
                        <CurrentDayInfoBlock>
                            <CurrentDayInfo>Давление</CurrentDayInfo>
                            <CurrentDayInfo>{(data && data.current.pressure)} мм рт.ст</CurrentDayInfo>
                        </CurrentDayInfoBlock>
                    </>
                </CurrentDayBlock>
                <WeekBlock>
                    <WeekIcons>
                        {allWeekMas.map(all => <WeekElement >
                            <img src={`https://openweathermap.org/img/wn/${all.weather[0].icon}@2x.png`} alt="weather" />
                            <p>Облачность : {all.clouds.all}</p>
                        </WeekElement>
                        )}
                    </WeekIcons>
                    <WeekIcons>
                        {sortedMasRu.map(s => <div>{s}</div>)}
                    </WeekIcons>
                   </WeekBlock>
                    </>
                }
            </Wrapper>
    );
};

export default WeatherBlock;

const Wrapper = styled.div`
  display: flex;
  
  border: 1px solid black;
  width: 80%;
  min-height: 50vh;
  margin: 10vh auto;
`
const CurrentDayBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  
  padding: 40px 20px;
  margin-right: 30px;
  border-right: 1px solid black;
`;
const WeekBlock = styled.div`
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-shrink: 1;
  max-width: 50%;
  padding-top: 100px;
`;

const CityBlock = styled.div``;
const City = styled.span`
  color: #000000;
  font-size: 16px;
  font-weight: bold;
  font-family: sans-serif;
`
const CurrentDayInfoBlock = styled.div`
  display: flex;
  justify-content: space-between
`;

const CurrentDayInfo = styled.div``

const WeekIcons = styled.div`
  display: flex;
`

const WeekElement = styled.div`
  min-width: 150px;
`
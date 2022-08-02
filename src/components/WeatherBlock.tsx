import React, { useEffect, useState } from 'react';
import {
  convertMasTimes,
  convertMasTimesRu,
  convertToCells,
  formatRuTime,
  getData,
  URL,
  URLWEEK,
} from '../utils';
import { CurrentDay, Week, WeekList } from '../types';
import Loader from './Loader';
import {
  City,
  CityBlock,
  CurrentDayBlock,
  CurrentDayInfo,
  CurrentDayInfoBlock,
  WeekBlock,
  WeekElement,
  WeekIcons,
  Wrapper,
} from './StyledComponents';

const timer = () => {
  setTimeout(() => {
    console.log('timer up');
  }, 60000);
};

function WeatherBlock() {
  const [data, setData] = useState<CurrentDay>();
  const [weekData, setWeekData] = useState<Week>();

  useEffect(() => {
    getData(URL, setData);
  }, [timer]);

  useEffect(() => {
    getData(URLWEEK, setWeekData);
  }, [timer]);

  const allWeekMas: WeekList[] = [];
  const mas: number[] & Date[] = [];

  const getAllElems = () => {
    if (weekData) {
      for (let i = 0; i < weekData.list.length; i + 1) {
        if (i % 8 === 0) {
          mas.push(weekData.list[i].dt);
          allWeekMas.push(weekData.list[i]);
        }
      }
    }
  };

  getAllElems();
  convertMasTimes(mas);
  convertMasTimesRu(mas);
  return (
    <Wrapper>
      {!data || !weekData ? (
        <Loader />
      ) : (
        <>
          <CurrentDayBlock>
            <CityBlock>
              <City>Омск</City>
            </CityBlock>
            <>
              <CurrentDayInfo>
                <CurrentDayInfo>{data && data.current.weather[0].description}</CurrentDayInfo>
                <CurrentDayInfo>
                  <img
                    src={`https://openweathermap.org/img/wn/${
                      data && data.current.weather[0].icon
                    }@2x.png`}
                    alt="weather"
                  />
                </CurrentDayInfo>
              </CurrentDayInfo>
              <CurrentDayInfoBlock>
                <CurrentDayInfo>День недели / дата</CurrentDayInfo>
                <CurrentDayInfo>{formatRuTime(new Date())}</CurrentDayInfo>
              </CurrentDayInfoBlock>
              <CurrentDayInfoBlock>
                <CurrentDayInfo>Текущая температура</CurrentDayInfo>
                <CurrentDayInfo>{data && convertToCells(data.current.temp)}</CurrentDayInfo>
              </CurrentDayInfoBlock>
              <CurrentDayInfoBlock>
                <CurrentDayInfo>Ощущается как:</CurrentDayInfo>
                <CurrentDayInfo>{data && convertToCells(data.current.feels_like)}</CurrentDayInfo>
              </CurrentDayInfoBlock>
              <CurrentDayInfoBlock>
                <CurrentDayInfo>Давление</CurrentDayInfo>
                <CurrentDayInfo>{data && data.current.pressure} мм рт.ст</CurrentDayInfo>
              </CurrentDayInfoBlock>
            </>
          </CurrentDayBlock>
          <WeekBlock>
            <WeekIcons>
              {allWeekMas.map((all) => (
                <WeekElement key={all.dt}>
                  <img
                    src={`https://openweathermap.org/img/wn/${all.weather[0].icon}@2x.png`}
                    alt="weather"
                  />
                  <p>Облачность :{all.clouds.all}</p>
                </WeekElement>
              ))}
            </WeekIcons>
            <WeekIcons>
              {convertMasTimesRu(mas).map((s: string, id: number) => (
                // eslint-disable-next-line react/no-array-index-key
                <div key={id}>{s}</div>
              ))}
            </WeekIcons>
          </WeekBlock>
        </>
      )}
    </Wrapper>
  );
}

export default WeatherBlock;

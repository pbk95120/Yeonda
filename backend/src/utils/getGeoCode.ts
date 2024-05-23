import CustomError from '@src/error';
import logger from '@src/logger';
import axios from 'axios';
import 'dotenv/config';
import http from 'http-status-codes';

const { SGIS_KEY, SGIS_SECRET } = process.env;

let sgis;

export interface LatLng {
  latitude: number;
  longitude: number;
}

const getSgisToken = async (): Promise<void> => {
  await axios
    .get('https://sgisapi.kostat.go.kr/OpenAPI3/auth/authentication.json', {
      params: {
        consumer_key: SGIS_KEY,
        consumer_secret: SGIS_SECRET,
      },
    })
    .then((res) => {
      sgis = res.data.result.accessToken;
    })
    .catch((error) => {
      logger.error('SGIS Token 획득 에러', error);
      throw error;
    });
};

export const getGeoCode = async (address: string): Promise<LatLng> => {
  await getSgisToken();

  let geoCode = {
    latitude: 0,
    longitude: 0,
  };

  let errorCount = 0;
  const retryCount = 3;
  let specificError;
  let retryError;

  while (errorCount < retryCount) {
    await axios
      .get('https://sgisapi.kostat.go.kr/OpenAPI3/addr/geocodewgs84.json', {
        params: {
          accessToken: sgis,
          address: address,
        },
      })
      .then((res) => {
        switch (parseInt(res.data.errCd)) {
          case 0:
            const data = res.data.result.resultdata[0];
            geoCode.latitude = data.y;
            geoCode.longitude = data.x;
            break;
          case -401:
            errorCount++;
            getSgisToken();
            break;
          case -100:
            errorCount = 3;
            specificError = new CustomError(http.NOT_FOUND, '주소 검색 결과 존재하지 않음');
            break;
          case -200:
            errorCount = 3;
            specificError = new CustomError(http.BAD_REQUEST, '올바르지 않은 주소');
            break;
        }
      })
      .catch((error) => {
        logger.error('GeoCode 획득 요청중 에러', error);
        retryError = error;
      });
    if (geoCode.latitude !== 0) break;
  }

  if (specificError) {
    logger.error('GeoCode 에러', specificError);
    throw specificError;
  }

  if (errorCount === retryCount) {
    logger.error('GeoCode 획득 시도 3번 초과');
    throw retryError;
  }

  return geoCode;
};

import moment from 'moment';
import { v4 as uuidv4 } from 'uuid';

// Random Text
export const randomText = (length) => {
  let result = '';
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

// Grouped an array
export let groupBy = function (array, key) {
  return array.reduce(function (item, x) {
    (item[x[key]] = item[x[key]] || []).push(x);
    return item;
  }, {});
};

// summation of array
export let totalSum = (array, key) => {
  const initialValue = 0;
  return array.reduce(
    (total, item) => total + parseFloat(item[key] ? item[key] : 0),
    initialValue
  );
};

// find max from array of object
export const findMaxFromArray = (arr = [], key) => {
  const max = arr.reduce((max, item) => {
    return item[key] > max ? item[key] : max;
  }, 0);
  const findData = arr.find((item) => item[key] === max);
  return { max, findData };
};

// Capitalized string
export function capitalizeWords(string) {
  return string.replace(/(?:^|\s)\S/g, function (a) {
    return a.toUpperCase();
  });
}

// get days between dates
export const getDayFromDates = (date) => {
  const oneDay = 24 * 60 * 60 * 1000;
  const firstDate = new Date(date);
  const secondDate = new Date();

  let TotalDays = Math.ceil(
    (secondDate.getTime() - firstDate.getTime()) / oneDay
  );
  return TotalDays;
};

// get all days of month
export const getDaysInMonth = (month, year) => {
  var date = new Date(year, month, 1);
  var days = [];
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days.length;
};

// day count in time between
export const calculateDayCount = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);

  // Calculate the difference in milliseconds
  const differenceInMs = Math.abs(end - start);

  // Convert milliseconds to days
  const days = Math.ceil(differenceInMs / (1000 * 60 * 60 * 24));

  return days;
};

// calculate duration
export const calculateDuration = (start, end) => {
  const startTime = moment(start);
  const endTime = moment(end);

  if (endTime.diff(startTime) < 1) {
    return 0;
  }

  const duration = moment.duration(endTime.diff(startTime));

  const years = moment.duration(duration).get('years');
  const months = moment.duration(duration).get('months');
  const days = moment.duration(duration).get('days');
  const hours = moment.duration(duration).get('hours');
  const minutes = moment.duration(duration).get('minutes');

  // return
  // return years + 'Y ' + months + 'M ' + days + 'D';
  return (
    (years ? years + ' Y' : '') +
    (months ? months + 'M ' : '') +
    (days ? days + ' D ' : '') +
    (hours ? hours + ' H ' : '') +
    (minutes ? minutes + ' Min' : '')
  );
};

export const getDistanceFromLatLonInMeters = (lat1, lon1, lat2, lon2) => {
  const R = 6371e3; // Earth radius in meters
  const toRad = (value) => (value * Math.PI) / 180;

  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);

  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;

  return distance; // in meters
};

export const getDeviceId = () => {
  let id = localStorage.getItem('device_id');
  if (!id) {
    id = uuidv4();
    localStorage.setItem('device_id', id);
  }
  return id;
};

export const salaryDistribution = (salary) => {
  const medical = 750;
  const conveyance = 450;
  const food = 1250;

  const basic = Math.round((salary - medical - conveyance - food) / 1.5);
  const rent = Math.round(basic / 2);

  return {
    basic: salary ? basic : 0,
    rent: salary ? rent : 0,
    medical: salary ? medical : 0,
    conveyance: salary ? conveyance : 0,
    food: salary ? food : 0,
  };
};

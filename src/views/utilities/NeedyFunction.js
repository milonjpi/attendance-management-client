import moment from 'moment';

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

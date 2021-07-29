import React from 'react';
import PropTypes from "prop-types";
 
// method 1
export function dateFormat(format, date) {
  let time = new Date();
  if (date) {
    if (typeof date === 'string') {
      const dateTemp = date.substr(0,4) + ',' + date.substr(4,2) + ',' + date.substr(6);
      time = new Date(dateTemp);
    } else {
      time = new Date(date);
    }
  }
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
 
  /* istanbul ignore else */
  if (month < 10) {
    month = '0' + month;
  }
  /* istanbul ignore else */
  if (day < 10) {
    day = '0' + day;
  }
  let result = '';
  switch(format) {
    case 'YYYY-MM-DD' : {
      return year + '-' + month + '-' + day;
    }
    case 'YYYY/MM/DD' : {
      return year + '/' + month + '/' + day;
    }
    case 'MM-DD-YYYY' : {
      return month + '-' + day + '-' + year;
    }
    case 'DD/MM/YYYY' : {
      return day + '/' + month + '/' + year;
    }
    case 'YYYY年MM月DD日' : {
      return year + '年' + month + '月' + day + '日';
    }
    default: {
      return result;
    }
  }
}
 
// method 2
export function DateFormat(props) {
  return(
    <span>{dateFormat(props.format, props.date)}</span>
  );
}
 
 
DateFormat.propTypes = {
  format: PropTypes.oneOf(['YYYY-MM-DD', 'YYYY/MM/DD', 'MM-DD-YYYY', 'DD/MM/YYYY', 'YYYY年MM月DD日']),
  date: PropTypes.oneOfType([
    PropTypes.number,
    PropTypes.string,
  ]),
};
 
DateFormat.defaultProps = {
  format: 'DD/MM/YYYY',
};
 
export default DateFormat;


// Calling method
// import { DateFormat, dateFormat } from 'Components/StandardFormat/DateFormat';
 
// <DateFormat format="DD/MM/YYYY" date={new Date()} />
 
// {dateFormat("DD/MM/YYYY", new Date())}
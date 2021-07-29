import React from 'react';
import PropTypes from 'prop-types';
 
// method 1
export function TimeFormat(format = +new Date()) {


  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let day = time.getDate();
  let hour = time.getHours();
  let minute = time.getMinutes();
  let seconds = time.getSeconds();
 
  let result = '';
  switch(format) {
    case 'DD/MM/YYYY HH:MM:SS' : {
      return addZero(day) + '/' +addZero(month)+ '/' + year + '  '+ addZero(hour) + ':' + addZero(minute) + ':' + addZero(seconds) ;
    }
    case 'HH:MM:SS' : {
      return addZero(hour) + ':' + addZero(minute) + ':' + addZero(seconds) ;
    }
    case 'HH:MM' : {
      return addZero(hour) + ':' + addZero(minute);
    }
    
    default: {
      return result;
    }
  }
  function addZero(m) {
    return m < 10 ? '0' + m : m;
}
}

// mothod 2
export function TimeFormatTag(props){
    return(
        <span>{TimeFormat(props.format)}</span>
    )
}
TimeFormatTag.PropTypes={
    format:PropTypes.oneOf(['DD/MM/YYYY HH:MM:SS','HH:MM:SS','HH:MM'])
}
TimeFormatTag.defaultProps = {
    format: 'HH:MM',
  };
export default TimeFormatTag;

// Calling method
// import { TimeFormat ,TimeFormatTag} from 'Components/StandardFormat/TimeFormat'; 
// {TimeFormat('DD/MM/YYYY HH:MM:SS')}
// {TimeFormat('HH:MM:SS')}
// {TimeFormat('HH:MM')}

// <TimeFormatTag format='DD/MM/YYYY HH:MM:SS'/>
// <TimeFormatTag format='HH:MM:SS'/>
// <TimeFormatTag format='HH:MM'/>
import React, { useState, useEffect } from 'react';

function Clock(props) {
   //Here we reference our custom hook
   const timer = useNewTimer(new Date());
   const date = new Date().toLocaleDateString('en-sg')
   return (
      <div>
        <p 
            className="timedisplay"
            style={{
                fontSize: '14px',
                width: '200px',
                lineHeight: '1.5',
                margin: ' auto 5px'
            }}
        >
            {date} {timer.toLocaleTimeString()}
        </p>
      </div>
    );
}
///////////////////////////////////////////////
//Below we've created a custom reusable hook
//////////////////////////////////////////////

function useNewTimer(currentDate) {
    const [date, setDate] = React.useState(currentDate);
    
    React.useEffect(() => {
      var timerID = setInterval( () => tick(), 1000 );
      return function cleanup() {
          clearInterval(timerID);
        };
     });
    
    function tick() {
      setDate(new Date());
     }
    
    return date;
  }

  export default Clock


// Original documentation and source code 
// https://productoptimist.com/start-using-react-hooks-a-clock-timer-example/
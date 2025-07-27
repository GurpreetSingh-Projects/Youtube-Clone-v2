import React, { useState, useEffect } from "react";

export const Test = () => {
  const [time, setTime] = useState(0);
  function stop() {
    setTime(10);
  }
  function start() {
    setTime(0);
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setTime((e) => {
        if (e < 10) {
          return e + 1;
        } else {
          return "reached 10";
        }
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <p>
      The current time is: {time}
      <br />
      <button onClick={start}>Start</button>
      <button onClick={stop}>Stop</button>
    </p>
  );
};

/* eslint react/prop-types: 0 */

import React from "react";

const styles = {
  background: {
    myColor: "#e5e5e5"
  },
  main: {
    myColor: "#f0f0f0"
  },
  ref: {
    myColor: "#ddd"
  },
  text: {
    myColor: "#b0b0b0",
    fontSize: "2.5em",
    userSelect: "none"
  },
  icon: {
    fontFamily: "icomoon",
    fontSize: "2em",
    userSelect: "none",
    myColor: "#666",
    myActiveColor: "orange"
  },
  tick: {
    myColor: "#d5d5d5",
    myActiveColor: "orange"
  },
  text2: {
    myColor: "#b0b0b0",
    fontSize: "1.5em",
    userSelect: "none"
  }
};

export default React.memo(() => {
  //const { radius } = useContext(WheelContext);
  const radius = 37;
  return (
    <>
      <defs>
        <filter id="f2">
          <feOffset result="offOut" in="SourceGraphic" dx="-3" dy="2" />
          <feColorMatrix
            type="matrix"
            values={` 
              1 0 0 0 0 
              0 1 0 0 0 
              0 0 1 0 0 
              0 0 0 1 0`}
          />
          <feGaussianBlur result="blurOut" in="offOut" stdDeviation="2" />
        </filter>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop
            offset="0%"
            style={{ stopColor: styles.background.myColor, stopOpacity: 1 }}
          />
          <stop
            offset="25%"
            style={{ stopColor: styles.main.myColor, stopOpacity: 1 }}
          />
          <stop
            offset="75%"
            style={{ stopColor: styles.main.myColor, stopOpacity: 1 }}
          />
          <stop offset="100%" style={{ stopColor: "white", stopOpacity: 1 }} />
        </linearGradient>
      </defs>
      <g style={{ cursor: "pointer" }}>
        {/* 
          Orange circle that folow the angle
        */}
        <circle
          cx="50"
          cy="50"
          r="40"
          fill="rgba(0,0,0,0.13)" //"#d5d5d5"
          //mask="url(#maskTR)"
          filter="url(#f2)"
        />
        <circle cx="50" cy="50" r="40" fill="url(#grad1)" />
        <circle cx="50" cy="50" r={radius} className="svg-f2" />
      </g>
    </>
  );
});

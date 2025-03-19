import React, { useState, useEffect, useCallback, useRef } from "react";

// Components
import Button from "./Button";
import Ticks from "./Ticks";

// export const WheelContext = React.createContext();
//const AngleContext = React.createContext();

const baseAngle = -2.5;
const radius = 37;

function Wheel({ children, callback, points, max, lock, fromValue, ...props }) {
  const [angle, setAngle] = useState(
    fromValue ? getAngleFromValue() : baseAngle
  );
  const [backPos, setBackPos] = useState([
    -29.923607205197822 + 50,
    40.05718077734669 + 50
  ]);

  function getAngleFromValue() {
    const value = fromValue > points ? points : fromValue < 0 ? 0 : fromValue;
    const absBase = Math.abs(baseAngle);
    return (value * (absBase * 2)) / points + baseAngle;
  }

  const offsetTop = React.useRef();
  const offsetLeft = React.useRef();
  const width = React.useRef();
  const height = React.useRef();
  const ref = React.useRef();

  const onMouseMove = useCallback(
    (e) => {
      if (e.type === "mousemove" && e.buttons !== 1) return;
      const pageX = e.pageX || e.targetTouches[0].pageX;
      const pageY = e.pageY || e.targetTouches[0].pageY;
      const [x, y] = [
        pageX - offsetLeft.current - width.current / 2,
        pageY - offsetTop.current - height.current / 2
      ];

      let angleRad = Math.atan2(x, -y);
      const absAngle = Math.abs(angleRad);
      const absBase = Math.abs(baseAngle);

      if (absAngle > absBase) {
        const sideAngle = angleRad < 0 ? -absBase : absBase;
        angleRad = sideAngle;
      }

      const coef = absBase * 2;
      let percentValue = ((angleRad + absBase) / coef) * points;
      if (max && percentValue > max) {
        percentValue = max;
        angleRad = (max / points) * absBase * 2 - absBase;
      }
      const newAngle = Math.round(angleRad * 100) / 100;
      setAngle(newAngle);

      if (callback) callback(Math.round(percentValue));
      e.preventDefault();
      e.stopPropagation();
    },
    [callback, max, points]
  );

  const getBoundingClientData = useCallback((curr) => {
    offsetTop.current = curr.getBoundingClientRect().top;
    offsetLeft.current = curr.getBoundingClientRect().left;
    width.current = curr.getBoundingClientRect().width;
    height.current = curr.getBoundingClientRect().height;
  }, []);

  useEffect(() => {
    const curr = ref.current;
    getBoundingClientData(curr);
    window.onresize = () => getBoundingClientData(curr);
    if (!lock) {
      curr.addEventListener("mousemove", onMouseMove);
      curr.addEventListener("touchmove", onMouseMove);
    }
    return () => {
      if (!lock) {
        curr.removeEventListener("mousemove", onMouseMove);
        curr.removeEventListener("touchmove", onMouseMove);
      }
    };
    // eslint-disable-next-line no-use-before-define
  }, [ref, lock, onMouseMove, getBoundingClientData]);

  useEffect(() => {
    const [x, y] = getPosFromAngle(angle, 50, 0);
    setBackPos([x + 50, y + 50]);
  }, [angle]);

  const trackerPos = useRef([0, 0]);

  useEffect(() => {
    trackerPos.current = getPosFromAngle(angle, radius, -3);
  }, []);

  const MemoTicks = React.useMemo(
    () => <Ticks baseAngle={baseAngle} points={points} radius={40} max={max} />,
    [points, max]
  );

  return (
    <svg
      {...props}
      preserveAspectRatio="xMidYMid meet"
      viewBox="0 0 100 100"
      ref={ref}
    >
      <defs>
        <mask id={`maskT-${max || "full"}`}>
          <rect x="0" y="0" width="100" height="100" fill="black" />
          {MemoTicks}
        </mask>
        {/* <mask id="maskTR">
              <rect x="0" y="0" width="100" height="100" fill="white" />
              <TicksForeGround fill="white" />
            </mask> */}
      </defs>
      <style xmlns="http://www.w3.org/2000/svg" type="text/css">
        {`
            .svg-f1{fill: white}
            .svg-f2{fill: #f0f0f0}
            .svg-f3{fill: #eee}
            .svg-f4{fill: #ddd}
            .svg-f5{fill: #b0b0b0}
            .svg-f6{fill: #666}
            .svg-f7{fill: orange}
          `}
      </style>
      <g id="ticks" mask={`url(#maskT-${max || "full"})`}>
        <rect x="0" y="0" width="100" height="100" className="svg-f4" />
        <path
          d={`
            M ${-29.923607205197822 + 50}, ${40.05718077734669 + 50}
            A 50, 50,
            0, ${angle > 0.6415926535897931 ? 1 : 0}, 1,
            ${backPos[0]}, ${backPos[1]}
            L 50, 50
            Z`}
          className="svg-f7"
        />
      </g>
      <Button />
      <circle
        style={{
          transformOrigin: `50% 50%`,
          transform: `rotate(${angle - baseAngle}rad)`,
          cursor: "pointer"
        }}
        className="svg-f4"
        cx={trackerPos.current[0] + 50}
        cy={trackerPos.current[1] + 50}
        r="2"
      />
      {children}

      {/* <path
            d="M 15 15
                A 50 50,
                0, 0, 0, 
                75 75"
            fill="blue"
            //stroke="blue"
            // L 50 35 Z
          /> */}
    </svg>
  );
}

export default React.memo(Wheel);

export function getPosFromAngle(angle, radius, offset = -10) {
  const x = Math.sin(-angle) * -(radius + offset);
  const y = Math.cos(-angle) * -(radius + offset);
  return [x, y];
}

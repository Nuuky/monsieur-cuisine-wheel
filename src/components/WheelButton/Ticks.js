import React from "react";
import { getPosFromAngle } from "./Wheel";

export default function Ticks({ baseAngle, points, radius, max }) {
  const [posArr, setPosArr] = React.useState([]);
  const absBase = Math.abs(baseAngle);
  const tickRange = (absBase * 2) / 61;
  const maxAngle = max ? (max / points) * absBase * 2 - absBase : null;

  React.useEffect(() => {
    const tempArr = [];
    for (let i = 1; i < 61; i++) {
      const angle = i * tickRange + baseAngle;
      if (maxAngle && angle > maxAngle) break;
      const [x1, y1] = getPosFromAngle(angle, radius, 1);
      const [x2, y2] = getPosFromAngle(angle, radius, 5);
      const data = {
        pos1: {
          x: x1 + 50,
          y: y1 + 50
        },
        pos2: {
          x: x2 + 50,
          y: y2 + 50
        },
        angle
      };
      tempArr.push(data);
    }
    setPosArr(tempArr);
  }, [maxAngle, tickRange, baseAngle, points, radius, max]);

  return (
    <g>
      {posArr.map((data, i) => (
        <line
          key={data.angle}
          x1={data.pos1.x}
          y1={data.pos1.y}
          x2={data.pos2.x}
          y2={data.pos2.y}
          stroke={"white"}
          strokeWidth={1.5}
        />
      ))}
    </g>
  );
}

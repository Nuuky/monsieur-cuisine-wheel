import React from "react";

export default React.memo(({ active }) => {
  const radius = 37;

  const x = 50;
  const y = 100 - (radius / 25) * 3;
  const baseRadius = radius / 20;
  return (
    <g>
      <circle
        cx={x}
        cy={y}
        r={baseRadius + 0.7}
        className="svg-f1"
        stroke="#ddd"
        strokeWidth="0.2"
      />
      <circle
        cx={x}
        cy={y}
        r={baseRadius}
        className={active ? "svg-f7" : "svg-f5"}
      />
    </g>
  );
});

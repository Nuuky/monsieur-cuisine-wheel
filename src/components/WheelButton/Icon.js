import React from "react";

export default React.memo(({ value, active }) => {
  return (
    <g>
      <style>{`
        .svg-icon {
          font-family: icomoon;
          font-size: 1em;
          user-select: none;
        }
      `}</style>
      {value && (
        <text
          x="50%"
          y="75%"
          dominantBaseline="middle"
          textAnchor="middle"
          className={`svg-icon ${active ? "svg-f7 " : "svg-f6 "}`}
        >
          {value}
        </text>
      )}
    </g>
  );
});

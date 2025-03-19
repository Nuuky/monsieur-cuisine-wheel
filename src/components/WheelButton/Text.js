import React from "react";

const Text = ({ value, type }) => {
  return (
    <g style={{ cursor: "pointer" }}>
      <style>{`
      .svg-text {
        font-size: 1.4em;
        user-select: none;
      }
      .svg-type {
        font-size: 0.7em;
        user-select: none;
      }
    `}</style>
      <text
        x="50%"
        y="45%"
        dominantBaseline="middle"
        textAnchor="middle"
        className="svg-f5 svg-text"
      >
        {value}
      </text>
      {type && (
        <text
          x="75%"
          y="45%"
          dominantBaseline="middle"
          textAnchor="middle"
          className="svg-f5 svg-type"
        >
          {type}
        </text>
      )}
    </g>
  );
};

export default React.memo(Text);

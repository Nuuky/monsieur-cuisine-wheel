import React from "react";
import { toMMSS } from "./utils";

import * as WheelButton from "./components/WheelButton";

const App = () => {
  const [time, setTime] = React.useState("00:00");
  const [speed, setSpeed] = React.useState(0);
  const [temp, setTemp] = React.useState(0);
  const [active, setActive] = React.useState(null);

  const getTime = React.useCallback((nb) => {
    let seconds = 0;
    for (let i = 0; i < nb; i++) {
      if (i < 60) seconds++;
      else if (i < 84) seconds += 10;
      else if (i < 114) seconds += 30;
      else if (i >= 114) seconds += 60;
    }
    setTime(toMMSS(seconds));
    setActive("time");
  }, []);

  const getSpeed = React.useCallback((nb) => {
    setActive("speed");
    setSpeed(nb);
  }, []);

  const getTemp = React.useCallback((nb) => {
    setTemp(nb);
    setActive("temp");
  }, []);

  const btnWidth = {
    width: "90%",
    style: { minWidth: "200px", maxWidth: "300px" }
  };
  return (
    <div className="App">
      <h1 style={{ color: "#666" }}>Monsieur Cuisine - Wheel</h1>
      <WheelButton.Wheel {...btnWidth} points={193} callback={getTime}>
        <WheelButton.Text value={time} />
        <WheelButton.Icon value="&#xe902;" active={active === "time"} />
        <WheelButton.Led active={active === "time"} />
      </WheelButton.Wheel>

      <WheelButton.Wheel {...btnWidth} points={10} max={3} callback={getSpeed}>
        <WheelButton.Text value={speed} />
        <WheelButton.Icon
          value="&#xe903;" /*&#xe901;*/
          active={active === "speed"}
        />
        <WheelButton.Led active={active === "speed"} />
      </WheelButton.Wheel>

      <WheelButton.Wheel {...btnWidth} points={130} callback={getTemp}>
        <WheelButton.Text value={temp} type="°C" />
        <WheelButton.Icon value="&#xe900;" active={active === "temp"} />
        <WheelButton.Led active={active === "temp"} />
      </WheelButton.Wheel>
    </div>
  );
};

export default App;

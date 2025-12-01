import "bootstrap/dist/css/bootstrap.min.css";
import "./DrumKeys.scss";
import React, { useState, useEffect } from "react";

const padsBank1 = [
  {
    key: "Q",
    name: "Heater 1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3",
  },
  {
    key: "W",
    name: "Heater 2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3",
  },
  {
    key: "E",
    name: "Heater 3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3",
  },
  {
    key: "A",
    name: "Heater 4",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3",
  },
  {
    key: "S",
    name: "Clap",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3",
  },
  {
    key: "D",
    name: "Open Hi-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3",
  },
  {
    key: "Z",
    name: "Kick n’ Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3",
  },
  {
    key: "X",
    name: "Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3",
  },
  {
    key: "C",
    name: "Closed Hi-Hat",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3",
  },
];

const padsBank2 = [
  {
    key: "Q",
    name: "Chord 1",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3",
  },
  {
    key: "W",
    name: "Chord 2",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3",
  },
  {
    key: "E",
    name: "Chord 3",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3",
  },
  {
    key: "A",
    name: "Shaker",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3",
  },
  {
    key: "S",
    name: "Open HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3",
  },
  {
    key: "D",
    name: "Closed HH",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3",
  },
  {
    key: "Z",
    name: "Punchy Kick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3",
  },
  {
    key: "X",
    name: "Side Stick",
    url: "https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3",
  },
  {
    key: "C",
    name: "Snare",
    url: "https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3",
  },
];

export const DrumMachine = function () {
  const [currentBank, setCurrentBank] = useState(padsBank1);
  const [isOn, setIsOn] = useState(false);
  const [displayText, setDisplayText] = useState("Power OFF");
  const [volume, setVolume] = useState(0.5);

  useEffect(() => {
    const display = document.getElementById("display");
    const bankInput = document.getElementById("ch1");
    const allowedKeys = ["Q", "W", "E", "A", "S", "D", "Z", "X", "C"];

    // map pads
    const mapped = currentBank.map((p) => ({
      key: p.key,
      name: p.name,
      url: p.url,
      audioEl: document.getElementById(p.key),
      padEl: document.getElementById(`pad-${p.key}`),
    }));

    // only set src once per bank change
    mapped.forEach((m) => {
      if (m.audioEl && m.audioEl.src !== m.url) m.audioEl.src = m.url;
    });

    // play function
    const playPad = (audioEl) => {
      if (!audioEl) return;
      audioEl.currentTime = 0;
      audioEl.volume = volume;
      audioEl.play();
    };

    // click handlers
    mapped.forEach(({ padEl, audioEl, name }) => {
      if (!padEl || !audioEl) return;
      if (padEl._handler) return;

      const handler = () => {
        padEl.style.backgroundColor = "skyblue";
        setTimeout(() => (padEl.style.backgroundColor = ""), 150);
        playPad(audioEl);
        display.innerText = name;
        setDisplayText(name);
      };

      padEl.addEventListener("click", handler);
      padEl._handler = handler;
    });

    // keyboard
    const handleKeyDown = (e) => {
      if (!isOn) return;
      const k = e.key.toUpperCase();
      if (!allowedKeys.includes(k)) return;
      const found = mapped.find((m) => m.key === k);
      if (!found) return;
      const { audioEl, padEl, name } = found;
      padEl.style.backgroundColor = "skyblue";
      setTimeout(() => (padEl.style.backgroundColor = ""), 150);
      playPad(audioEl);
      display.innerText = name;
      setDisplayText(name);
    };

    // bank toggle
    const handleBankClick = (ev) => {
      if (!isOn) {
        ev.target.checked = !ev.target.checked;
        const prev = display.innerText;
        display.innerText = "Drum is OFF";
        setTimeout(() => (display.innerText = prev), 800);

        return;
      }
      setCurrentBank((prev) => (prev === padsBank1 ? padsBank2 : padsBank1));
      display.innerText = ev.target.checked ? "Smooth Piano Kit" : "Heater Kit";
      setTimeout(() => (display.innerText = ""), 700);
    };

    if (bankInput) bankInput.addEventListener("click", handleBankClick);
    if (isOn) {
      window.addEventListener("keydown", handleKeyDown);
      display.style.backgroundColor = "rgb(207, 207, 207)";
    } else {
      display.style.backgroundColor = "";
    }

    return () => {
      mapped.forEach(({ padEl }) => {
        if (padEl && padEl._handler) {
          padEl.removeEventListener("click", padEl._handler);
          delete padEl._handler;
        }
      });
      if (bankInput) bankInput.removeEventListener("click", handleBankClick);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [currentBank, isOn, volume]);

  const handleScreenClick = () => {
    setIsOn((prev) => {
      const next = !prev;
      setDisplayText(next ? "Power ON" : "Power OFF");
      return next;
    });
  };

  const handleBankChangeStub = () => {};

  const handleVolumeChange = (e) => setVolume(parseFloat(e.target.value));

  return (
    <div
      id="drum-machine"
      className="container-fluid text-center mt-5 container__one"
    >
      <label className="slider">
        <input
          type="range"
          className="level"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
        <svg
          className="volume"
          xmlns="http://www.w3.org/2000/svg"
          xmlnsXlink="http://www.w3.org/1999/xlink"
          version="1.1"
          width="512"
          height="512"
          x="0"
          y="0"
          viewBox="0 0 24 24"
          style={{ enableBackground: "new 0 0 512 512" }}
          xmlSpace="preserve"
        >
          <g>
            <path
              d="M18.36 19.36a1 1 0 0 1-.705-1.71C19.167 16.148 20 14.142 20 12s-.833-4.148-2.345-5.65a1 1 0 1 1 1.41-1.419C20.958 6.812 22 9.322 22 12s-1.042 5.188-2.935 7.069a.997.997 0 0 1-.705.291z"
              fill="currentColor"
            />
            <path
              d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z"
              fill="currentColor"
            />
          </g>
        </svg>
      </label>

      <div id="display" className="screen d-flex" onClick={handleScreenClick}>
        {displayText}
      </div>

      <div className="row">
        {["Q", "W", "E"].map((k) => (
          <div key={k} className="col d-flex drum-pad" id={`pad-${k}`}>
            <audio
              id={k}
              src={currentBank.find((p) => p.key === k).url}
            ></audio>
            {k}
          </div>
        ))}
      </div>
      <div className="row">
        {["A", "S", "D"].map((k) => (
          <div key={k} className="col d-flex drum-pad" id={`pad-${k}`}>
            <audio
              id={k}
              src={currentBank.find((p) => p.key === k).url}
            ></audio>
            {k}
          </div>
        ))}
      </div>
      <div className="row">
        {["Z", "X", "C"].map((k) => (
          <div key={k} className="col d-flex drum-pad" id={`pad-${k}`}>
            <audio
              id={k}
              src={currentBank.find((p) => p.key === k).url}
            ></audio>
            {k}
          </div>
        ))}
      </div>

      <div className="content d-flex">
        <label className="checkBox d-flex">
          <input id="ch1" type="checkbox" onChange={handleBankChangeStub} />
          Bnk
          <div className="transition error"></div>
        </label>
      </div>
    </div>
  );
};

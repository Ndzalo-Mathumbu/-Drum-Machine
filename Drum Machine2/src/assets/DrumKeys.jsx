import "bootstrap/dist/css/bootstrap.min.css";
import "./DrumKeys.scss";
import React, { useState, useEffect } from "react";

// just store IDs, not actual elements
const padSound = [
  { padId: "Q", soundId: "Heater-1" },
  { padId: "W", soundId: "Heater-2" },
  { padId: "E", soundId: "Heater-3" },
  { padId: "A", soundId: "Heater-4" },
  { padId: "S", soundId: "Heater-6" },
  { padId: "D", soundId: "Heater-7" },
  { padId: "Z", soundId: "Heater-8" },
  { padId: "X", soundId: "Heater-9" },
  { padId: "C", soundId: "Heater-10" },
];

const padSound2 = [
  { padId: "Q", soundId: "Chord-1" },
  { padId: "W", soundId: "Chord-2" },
  { padId: "E", soundId: "Chord-3" },
  { padId: "A", soundId: "Shaker" },
  { padId: "S", soundId: "Open-HH" },
  { padId: "D", soundId: "Closed-HH" },
  { padId: "Z", soundId: "Punchy-Kick" },
  { padId: "X", soundId: "Side-Stick" },
  { padId: "C", soundId: "Snare" },
];

export const DrumMachine = function () {
  const [currentArray, setCurrentArray] = useState(padSound);

  useEffect(() => {
    const screen = document.querySelector(".screen");
    let bankBtn = document.querySelector("#ch1");
    let isOn = false;

    // map IDs to elements after render
    const mappedArray = currentArray.map(({ padId, soundId }) => ({
      pad: document.getElementById(padId),
      sound: document.getElementById(soundId),
    }));

    // click handler for pads
    const addPadListeners = () => {
      mappedArray.forEach(({ pad, sound }) => {
        if (!pad || !sound) return;

        const handler = () => {
          pad.style.backgroundColor = "skyblue";
          setTimeout(() => (pad.style.backgroundColor = ""), 150);

          sound.currentTime = 0;
          sound.play();

          const soundNames = [
            "Heater 1",
            "Heater 2",
            "Heater 3",
            "Heater 4",
            "Clap",
            "Open Hi-Hat",
            "Kick n’ Hat",
            "Kick",
            "Closed Hi-Hat",
          ];

          const capletter = pad.innerText;
          switch (capletter) {
            case "Q":
              screen.innerHTML = soundNames[0];
              break;
            case "W":
              screen.innerHTML = soundNames[1];
              break;
            case "E":
              screen.innerHTML = soundNames[2];
              break;
            case "A":
              screen.innerHTML = soundNames[3];
              break;
            case "S":
              screen.innerHTML = soundNames[4];
              break;
            case "D":
              screen.innerHTML = soundNames[5];
              break;
            case "Z":
              screen.innerHTML = soundNames[6];
              break;
            case "X":
              screen.innerHTML = soundNames[7];
              break;
            case "C":
              screen.innerHTML = soundNames[8];
              break;
            default:
              "~ Ndzalo NK Mathumbu";
          }
        };

        pad.addEventListener("click", handler);
        pad._handler = handler;
      });
    };

    // remove pad listeners
    const removePadListeners = () => {
      mappedArray.forEach(({ pad }) => {
        if (!pad || !pad._handler) return;
        pad.removeEventListener("click", pad._handler);
        delete pad._handler;
      });
    };

    // key press handler
    const handleKeyDown = (e) => {
      if (!isOn) return;
      const key = e.key.toUpperCase();
      const padObj = mappedArray.find((p) => p.pad.innerText === key);
      const soundNames = [
        "Heater 1",
        "Heater 2",
        "Heater 3",
        "Heater 4",
        "Clap",
        "Open Hi-Hat",
        "Kick n’ Hat",
        "Kick",
        "Closed Hi-Hat",
      ];

      switch (key) {
        case "Q":
          screen.innerHTML = soundNames[0];
          break;
        case "W":
          screen.innerHTML = soundNames[1];
          break;
        case "E":
          screen.innerHTML = soundNames[2];
          break;
        case "A":
          screen.innerHTML = soundNames[3];
          break;
        case "S":
          screen.innerHTML = soundNames[4];
          break;
        case "D":
          screen.innerHTML = soundNames[5];
          break;
        case "Z":
          screen.innerHTML = soundNames[6];
          break;
        case "X":
          screen.innerHTML = soundNames[7];
          break;
        case "C":
          screen.innerHTML = soundNames[8];
          break;
        default:
          "~ Ndzalo NK Mathumbu";
      }

      if (padObj) {
        padObj.pad.style.backgroundColor = "skyblue";
        setTimeout(() => (padObj.pad.style.backgroundColor = ""), 150);

        padObj.sound.currentTime = 0;
        padObj.sound.play();
      }
    };

    // toggle power
    const togglePower = () => {
      isOn = !isOn;
      if (isOn) {
        screen.style.backgroundColor = "rgb(207, 207, 207)";
        addPadListeners();
        window.addEventListener("keydown", handleKeyDown);
        screen.textContent = "Power ON";
      } else {
        screen.style.backgroundColor = "";
        removePadListeners();
        window.removeEventListener("keydown", handleKeyDown);
        screen.textContent = "Power OFF";
      }
    };

    // bank toggle
    const soundSwitch = ["Sound 1", "Sound 2"];

    // Remove all previous listeners before adding new ones
    const makeSwitch = () => {
      // Remove old listener first
      const newBankBtn = bankBtn.cloneNode(true);
      bankBtn.parentNode.replaceChild(newBankBtn, bankBtn);

      // Update reference
      bankBtn = newBankBtn;

      bankBtn.addEventListener("change", () => {
        if (bankBtn.checked) {
          screen.textContent = soundSwitch[1]; // Bank 2 active
          setCurrentArray(padSound2); // Switch pads
        } else {
          screen.textContent = soundSwitch[0]; // Bank 1 active
          setCurrentArray(padSound); // Switch pads
        }

        // Reset pad listeners depending on power
        if (isOn) {
          removePadListeners();
          addPadListeners();
        }
      });
    };

    // initialize
    makeSwitch();
    screen.addEventListener("click", togglePower);

    return () => {
      removePadListeners();
      window.removeEventListener("keydown", handleKeyDown);
      screen.removeEventListener("click", togglePower);
    };
  }, [currentArray]);

  return (
    <div className="container-fluid text-center mt-5 container__one">
      <label className="slider">
        <input type="range" className="level" />
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
              data-original="#000000"
            ></path>
            <path
              d="M15.53 16.53a.999.999 0 0 1-.703-1.711C15.572 14.082 16 13.054 16 12s-.428-2.082-1.173-2.819a1 1 0 1 1 1.406-1.422A6 6 0 0 1 18 12a6 6 0 0 1-1.767 4.241.996.996 0 0 1-.703.289zM12 22a1 1 0 0 1-.707-.293L6.586 17H4c-1.103 0-2-.897-2-2V9c0-1.103.897-2 2-2h2.586l4.707-4.707A.998.998 0 0 1 13 3v18a1 1 0 0 1-1 1z"
              fill="currentColor"
              data-original="#000000"
            ></path>
          </g>
        </svg>
      </label>

      <div className="screen d-flex">Power OFF</div>

      {/* JSX for pads */}
      <div className="row">
        <div className="col d-flex" id="Q">
          <audio
            id="Heater-1"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
          ></audio>
          <audio
            id="Chord-1"
            src="https://s3.amazonaws.com/freecodecamp/drums/Chord_1.mp3"
          ></audio>
          Q
        </div>
        <div className="col d-flex" id="W">
          <audio
            id="Heater-2"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
          ></audio>
          <audio
            id="Chord-2"
            src="https://s3.amazonaws.com/freecodecamp/drums/Chord_2.mp3"
          ></audio>
          W
        </div>
        <div className="col d-flex" id="E">
          <audio
            id="Heater-3"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
          ></audio>
          <audio
            id="Chord-3"
            src="https://s3.amazonaws.com/freecodecamp/drums/Chord_3.mp3"
          ></audio>
          E
        </div>
      </div>

      <div className="row">
        <div className="col d-flex" id="A">
          <audio
            id="Heater-4"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-4_1.mp3"
          ></audio>
          <audio
            id="Shaker"
            src="https://s3.amazonaws.com/freecodecamp/drums/Give_us_a_light.mp3"
          ></audio>
          A
        </div>
        <div className="col d-flex" id="S">
          <audio
            id="Heater-6"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
          ></audio>
          <audio
            id="Open-HH"
            src="https://s3.amazonaws.com/freecodecamp/drums/Dry_Ohh.mp3"
          ></audio>
          S
        </div>
        <div className="col d-flex" id="D">
          <audio
            id="Heater-7"
            src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
          ></audio>
          <audio
            id="Closed-HH"
            src="https://s3.amazonaws.com/freecodecamp/drums/Bld_H1.mp3"
          ></audio>
          D
        </div>
      </div>

      <div className="row">
        <div className="col d-flex" id="Z">
          <audio
            id="Heater-8"
            src="https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3"
          ></audio>
          <audio
            id="Punchy-Kick"
            src="https://s3.amazonaws.com/freecodecamp/drums/punchy_kick_1.mp3"
          ></audio>
          Z
        </div>
        <div className="col d-flex" id="X">
          <audio
            id="Heater-9"
            src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
          ></audio>
          <audio
            id="Side-Stick"
            src="https://s3.amazonaws.com/freecodecamp/drums/side_stick_1.mp3"
          ></audio>
          X
        </div>
        <div className="col d-flex" id="C">
          <audio
            id="Heater-10"
            src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
          ></audio>
          <audio
            id="Snare"
            src="https://s3.amazonaws.com/freecodecamp/drums/Brk_Snr.mp3"
          ></audio>
          C
        </div>
      </div>

      <div className="content d-flex">
        <label className="checkBox d-flex">
          <input
            id="ch1"
            type="checkbox"
            onChange={() => {
              setCurrentArray((currentArr) => {
                if (currentArr === padSound) {
                  return padSound2;
                } else return padSound;
              });
            }}
          />
          Bnk
          <div className="transition"></div>
        </label>
      </div>
    </div>
  );
};

import "bootstrap/dist/css/bootstrap.min.css";
import "./DrumKeys.scss";
import React from "react";

export const DrumMachine = function () {
  React.useEffect(() => {
    const screen = document.querySelector(".screen");
    let displayName;
    // all pads and sounds
    const padSound = [
      {
        pad: document.querySelector("#Q"),
        sound: document.getElementById("Heater-1"),
      },
      {
        pad: document.querySelector("#W"),
        sound: document.getElementById("Heater-2"),
      },
      {
        pad: document.querySelector("#E"),
        sound: document.getElementById("Heater-3"),
      },
      {
        pad: document.querySelector("#A"),
        sound: document.getElementById("Heater-4"),
      },
      {
        pad: document.querySelector("#S"),
        sound: document.getElementById("Heater-6"),
      },
      {
        pad: document.querySelector("#D"),
        sound: document.getElementById("Heater-7"),
      },
      {
        pad: document.querySelector("#Z"),
        sound: document.getElementById("Heater-8"),
      },
      {
        pad: document.querySelector("#X"),
        sound: document.getElementById("Heater-9"),
      },
      {
        pad: document.querySelector("#C"),
        sound: document.getElementById("Heater-10"),
      },
    ];

    let isOn = false;

    // Click for each pad
    const addPadListeners = () => {
      padSound.forEach(({ pad, sound }) => {
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
              // displayName = soundNames[0];
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
          // console.log(displayName);
        };
        pad.addEventListener("click", handler);
        pad._handler = handler;
      });
    };

    const removePadListeners = () => {
      padSound.forEach(({ pad }) => {
        if (pad._handler) {
          pad.removeEventListener("click", pad._handler);
          delete pad._handler;
        }
      });
    };

    // Key press handler
    const handleKeyDown = (e) => {
      if (!isOn) return;
      const key = e.key.toUpperCase();
      const padObj = padSound.find((p) => p.pad.innerText === key);
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

      const capletter = key;
      switch (capletter) {
        case "Q":
          // displayName = soundNames[0];
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

    // Toggle power
    const togglePower = () => {
      isOn = !isOn;

      if (isOn) {
        screen.style.backgroundColor = "rgb(207, 207, 207)";
        addPadListeners();
        window.addEventListener("keydown", handleKeyDown);
        screen.textContent = `Power ON`;
      } else {
        screen.style.backgroundColor = "";
        removePadListeners();
        window.removeEventListener("keydown", handleKeyDown);
        screen.textContent = `Power OFF`;
      }
    };

    // renderSoundName();
    screen.addEventListener("click", togglePower);

    // Cleanup on unmount
    return () => {
      removePadListeners();
      window.removeEventListener("keydown", handleKeyDown);
      screen.removeEventListener("click", togglePower);
    };
  }, []);

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

      <div className="row">
        <div className="col d-flex" id="Q">
          <audio
            id="Heater-1"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3"
          ></audio>
          Q
        </div>
        <div className="col d-flex" id="W">
          <audio
            id="Heater-2"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3"
          ></audio>
          W
        </div>
        <div className="col d-flex" id="E">
          <audio
            id="Heater-3"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3"
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
          A
        </div>
        <div className="col d-flex" id="S">
          <audio
            id="Heater-6"
            src="https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3"
          ></audio>
          S
        </div>
        <div className="col d-flex" id="D">
          <audio
            id="Heater-7"
            src="https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3"
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
          Z
        </div>
        <div className="col d-flex" id="X">
          <audio
            id="Heater-9"
            src="https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3"
          ></audio>
          X
        </div>
        <div className="col d-flex" id="C">
          <audio
            id="Heater-10"
            src="https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3"
          ></audio>
          C
        </div>
      </div>

      <div className="content d-flex">
        <label className="checkBox d-flex">
          <input id="ch1" type="checkbox" />
          Bnk
          <div className="transition"></div>
        </label>
      </div>
    </div>
  );
};

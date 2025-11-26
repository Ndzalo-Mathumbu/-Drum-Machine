import "bootstrap/dist/css/bootstrap.min.css";
import "./DrumKeys.scss";
import React from "react";

export const DrumMachine = function () {
  React.useEffect(() => {
    const Heater1 = document.getElementById("Heater-1");
    const Heater2 = document.getElementById("Heater-2");
    const Heater3 = document.getElementById("Heater-3");
    const Heater4 = document.getElementById("Heater-4");
    const Heater6 = document.getElementById("Heater-6");
    const Heater7 = document.getElementById("Heater-7");
    const Heater8 = document.getElementById("Heater-8");
    const Heater9 = document.getElementById("Heater-9");
    const Heater10 = document.getElementById("Heater-10");

    const Q = document.querySelector("#Q");
    const W = document.querySelector("#W");
    const E = document.querySelector("#E");
    const A = document.querySelector("#A");
    const S = document.querySelector("#S");
    const D = document.querySelector("#D");
    const Z = document.querySelector("#Z");
    const X = document.querySelector("#X");
    const C = document.querySelector("#C");

    const padSound = [
      { pad: Q, sound: Heater1 },
      { pad: W, sound: Heater2 },
      { pad: E, sound: Heater3 },
      { pad: A, sound: Heater4 },
      { pad: S, sound: Heater6 },
      { pad: D, sound: Heater7 },
      { pad: Z, sound: Heater8 },
      { pad: X, sound: Heater9 },
      { pad: C, sound: Heater10 },
    ];

    const playSound = function () {
      padSound.forEach(({ pad, sound }) => {
        pad.addEventListener("click", () => {
          pad.style.backgroundColor = "skyblue";
          setTimeout(() => {
            pad.style.backgroundColor = "";
          }, 150);
          sound.currentTime = 0;
          sound.play();
        });
      });
    };
    playSound();
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

      <div className="screen d-flex">Heater 1</div>

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

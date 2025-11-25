import "bootstrap/dist/css/bootstrap.min.css";
import "./DrumKeys.scss";
export const DrumMachine = function () {
  return (
    <div className="container text-center mt-5 container__one">
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
        <div className="col d-flex">Q</div>
        <div className="col d-flex">W</div>
        <div className="col d-flex">E</div>
      </div>

      <div className="row">
        <div className="col d-flex">A</div>
        <div className="col d-flex">S</div>
        <div className="col d-flex">D</div>
      </div>

      <div className="row">
        <div className="col d-flex">Z</div>
        <div className="col d-flex">X</div>
        <div className="col d-flex">C</div>
      </div>

      <div className="content d-flex">
        <label className="checkBox d-flex">
          <input id="ch1" type="checkbox" />
          Bank
          <div className="transition"></div>
        </label>
      </div>
    </div>
  );
};

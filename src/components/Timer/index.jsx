import React, {useEffect, useRef} from "react";
import S from "./styles.module.css";
import { Link } from 'react-router-dom';

const debounce = (fn, timeout = 100) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { fn.apply(this, args); }, timeout);
  };
}

const Timer = ({ show }) => {
  return (
    show && (
      <div className={S.timer_wrapper}>
        <h3>Cuántas repeticiones?</h3>
        <Dial />
        <Link to={`/poses`}>
        <button>Empezar</button>
        </Link>
      </div>
    )
  );
};

const Dial = () => {
  let dialRef = useRef();

  useEffect(() => {


    dialRef.current.addEventListener("scroll", debounce(() => {
			let x_ = dialRef.current.getBoundingClientRect().width / 2
			let {top, height} = dialRef.current.querySelector('li').getBoundingClientRect()
			let y_ = top + height / 2
			dialRef.current.getElementsByClassName(S.selected)[0]?.classList.remove(S.selected)
			document.elementFromPoint(x_, y_)?.classList.add(S.selected)
		}))

  }, []); // [window.innerWidth]);

  return (
    <div className={S.dial} ref={dialRef}>
      <ul>
        {[...Array(51).keys()].slice(1).map((key) => (
          <li key={key}>{key}</li>
        ))}
      </ul>
    </div>
  );
};

export default Timer;

import React from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "./non-sticky-slider.sass";
import "./slider-display.sass";
const SliderModal = ({ children, clickState, setClickState, width, from }) => {
  const WIDTH = width ? width + "vw" : "60vw";
  return (
    <div>
      <SlidingPane
        className="non-sticky-slider"
        isOpen={clickState}
        hideHeader={true}
        width={WIDTH}
        from={from}
        onRequestClose={() => {
          setClickState(false);
        }}
      >
        {children}
      </SlidingPane>
    </div>
  );
};

export default SliderModal;

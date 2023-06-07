import React from "react";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";
import "./StickySlider.sass";
import "./slider-display.sass";

const StickySlider = ({ children, clickState, setClickState, width }) => {
  //const WIDTH = width ? width + "vw" : "60vw";
  return (
    <div>
      <SlidingPane
        className="sticky-slider"
        isOpen={clickState}
        hideHeader={true}
        width={"100vw"}
        onRequestClose={() => {
          setClickState(false);
        }}
      >
        <div className="sticky-slider-wrapper">{children}</div>
      </SlidingPane>
    </div>
  );
};

export default StickySlider;

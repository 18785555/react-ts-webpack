import { Slider } from "antd";
import React from "react";
const volumStyle: React.CSSProperties = {position: "absolute",marginLeft: "20px"};
const style: React.CSSProperties = {width: "70px",color: "gray"};
const Volum = (props: any) => {
  const { changeVolume, onMouseLeave,volume } = props;
  const volumChangeHandle = (value: number) => changeVolume(value);

  return (
    <div style={volumStyle} onMouseLeave={onMouseLeave}>
      <Slider onChange={volumChangeHandle} style={style} defaultValue={volume} />
    </div>
  );
};

export default Volum;

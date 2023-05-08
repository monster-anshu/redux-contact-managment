import { FC, useLayoutEffect, useRef, useState } from "react";
import "leaflet/dist/leaflet.css";
import Graphs from "components/Graphs";
import Map from "components/Map";

export interface IChartsProps {}

const Charts: FC<IChartsProps> = () => {
  return (
    <div className="h-full ">
      <Map />
      <Graphs />
    </div>
  );
};

export default Charts;

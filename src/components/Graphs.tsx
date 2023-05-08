import CovidApi from "api/covidApi";
import { useQuery } from "@tanstack/react-query";
import React, { FC } from "react";
import LineGraph from "./LineGraph";

export interface IGraphsProps {}

const Graphs: FC<IGraphsProps> = () => {
  const withDate = useQuery({
    queryKey: ["dataWithDate"],
    queryFn: CovidApi.withDate,
  });

  if (withDate.isLoading) return <p>Loading</p>;

  if (withDate.isError) return <p>Error</p>;

  const deaths = () => {
    const data = [] as {
      date: string;
      value: number;
    }[];
    for (let [date, value] of Object.entries(withDate.data.deaths ?? {})) {
      data.push({
        date,
        value,
      });
    }
    return data;
  };

  const recovered = () => {
    const data = [] as {
      date: string;
      value: number;
    }[];
    for (let [date, value] of Object.entries(withDate.data.recovered ?? {})) {
      value &&
        data.push({
          date,
          value,
        });
    }
    return data;
  };

  const cases = () => {
    const data = [] as {
      date: string;
      value: number;
    }[];
    for (let [date, value] of Object.entries(withDate.data.cases ?? {})) {
      data.push({
        date,
        value,
      });
    }
    return data;
  };

  return (
    <div className="p-5 ">
      <div className="p-6 mb-10 rounded-lg shadow-lg bg-slate-100">
        <LineGraph data={cases()} color="blue" />
        <p className="my-2 text-3xl font-medium text-center">Cases</p>
      </div>
      <div className="p-6 mb-10 rounded-lg shadow-lg bg-slate-100 ">
        <LineGraph data={deaths()} color="red" />
        <p className="my-2 text-3xl font-medium text-center">Deaths</p>
      </div>
      <div className="p-6 rounded-lg shadow-lg bg-slate-100">
        <LineGraph data={recovered()} color="green" />
        <p className="my-2 text-3xl font-medium text-center">Recovered</p>
      </div>
    </div>
  );
};
export default Graphs;

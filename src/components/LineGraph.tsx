import { FC } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export interface ILineGraphProps {
  data: {
    date: string;
    value: number;
  }[];
  color: string;
}

const LineGraph: FC<ILineGraphProps> = ({ data, color }) => {
  return (
    <ResponsiveContainer width={"100%"} height={400}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="date" />
        <YAxis tickFormatter={DataFormater} />
        <Tooltip />
        <Line type="monotone" dataKey="value" stroke={color} />
      </LineChart>
    </ResponsiveContainer>
  );
};

const DataFormater = (number: number) => {
  if (number > 1000000000) {
    return (number / 1000000000).toString() + "B";
  } else if (number > 1000000) {
    return (number / 1000000).toString() + "M";
  } else if (number > 1000) {
    return (number / 1000).toString() + "K";
  } else {
    return number.toString();
  }
};
export default LineGraph;

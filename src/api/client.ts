import { create } from "apisauce";

const diseaseApi = create({
  baseURL: "https://disease.sh/v3/covid-19",
});

export default diseaseApi;

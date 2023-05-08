import diseaseApi from "./client";

export default class CovidApi {
  static async wordWide() {
    const { data, ok } = await diseaseApi.get<WordWideData>("/all");
    if (!ok || !data) return undefined;
    return data;
  }

  static async countries() {
    const { data, ok } = await diseaseApi.get<CountryData[]>("/countries");
    if (!ok || !data) return [];
    return data;
  }

  static async withDate() {
    const { data, ok } = await diseaseApi.get<WithDate>(
      "/historical/all?lastdays=all"
    );
    if (!ok || !data)
      return {
        cases: {},
        deaths: {},
        recovered: {},
      };
    return data;
  }
}

export interface WordWideData {
  updated: number;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
  affectedCountries: number;
}

export interface CountryData {
  updated: number;
  country: string;
  countryInfo: CountryInfo;
  cases: number;
  todayCases: number;
  deaths: number;
  todayDeaths: number;
  recovered: number;
  todayRecovered: number;
  active: number;
  critical: number;
  casesPerOneMillion: number;
  deathsPerOneMillion: number;
  tests: number;
  testsPerOneMillion: number;
  population: number;
  continent: string;
  oneCasePerPeople: number;
  oneDeathPerPeople: number;
  oneTestPerPeople: number;
  activePerOneMillion: number;
  recoveredPerOneMillion: number;
  criticalPerOneMillion: number;
}

export interface CountryInfo {
  _id?: number;
  iso2?: string;
  iso3?: string;
  lat: number;
  long: number;
  flag: string;
}

export interface WithDate {
  cases: Record<string, number>;
  deaths: Record<string, number>;
  recovered: Record<string, number>;
}

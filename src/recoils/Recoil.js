import { atom, selector } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default: [],
});

export const selectedCountriesState = atom({
  key: "selectedCountries",
  default: [],
});

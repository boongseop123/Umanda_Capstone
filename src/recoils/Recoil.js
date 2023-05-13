import { atom, selector } from "recoil";

export const tokenState = atom({
  key: "tokenState",
  default: "",
});

export const selectedCountriesState = atom({
  key: "selectedCountries",
  default: [],
});

export const selectedSpotsState = atom({
  key: "selectedSpotsState",
  default: [],
});

export const selectedCountryNameState = atom({
  key: "selectedCountryNameState",
  default: "",
});

export const selectedOptionsState = atom({
  key: "selectedOptionsState",
  default: [],
});

export const responseState = atom({
  key: "responseState",
  default: "",
});

export const latitudeState = atom({
  key: "latitudeState",
  default: null,
});

export const longitudeState = atom({
  key: "longitudeState",
  default: null,
});

export const IdState = atom({
  key: "IdState",
  default: 0,
});

export const postState = atom({
  key: "postState",
  default: [],
});

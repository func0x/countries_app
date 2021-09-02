interface Currency {
  code: string;
  name: string;
  symbol: string;
}

interface ILanguage {
  iso639_1: string;
  iso639_2: string;
  name: string;
  nativeName: string;
}

interface IRegionalBloc {
  acronym: string;
  name: string;
  otherAcronyms: string[];
  otherNames: string[];
}

interface ITranslation {
  [key: string]: string;
}

export default interface ICountry {
  name: string;
  topLevelDomain: string[];
  alpha2Code: string;
  alpha3Code: string;
  callingCodes: string[];
  capital: string;
  altSpellings: string[];
  region: string;
  subregion: string;
  population: Number;
  lating: Number[];
  demonym: string;
  area: Number;
  gini: Number;
  timezones: string[];
  borders: string[];
  nativeName: string;
  numericCode: string;
  currencies: Currency[];
  languages: ILanguage[];
  translations: ITranslation;
  flag: string;
  regionalBlocks: IRegionalBloc[];
  cioc: string;
}

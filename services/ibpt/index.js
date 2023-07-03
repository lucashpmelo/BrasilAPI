import axios from 'axios';

const baseURL =
  'https://raw.githubusercontent.com/lucashpmelo/TabelaIBPTax/main';

const baseURLNcm = `${baseURL}/NCM`;
const baseURLNbs = `${baseURL}/NBS`;
const baseURLLc116 = `${baseURL}/LC116`;

const fetchListFromRepositorie = async (url) => {
  const { data } = await axios.get(url);

  return data;
};

export const getNcmIbpt = (options) => {
  const { uf } = options;

  const url = `${baseURLNcm}/TabelaIBPTax${uf}.json`;

  return fetchListFromRepositorie(url);
};

export const getNbsIbpt = (options) => {
  const { uf } = options;

  const url = `${baseURLNbs}/TabelaIBPTax${uf}.json`;

  return fetchListFromRepositorie(url);
};

export const getLc116Ibpt = (options) => {
  const { uf } = options;

  const url = `${baseURLLc116}/TabelaIBPTax${uf}.json`;

  return fetchListFromRepositorie(url);
};

export const getVersao = () => {
  const url = `${baseURL}/versao.json`;

  return fetchListFromRepositorie(url);
};

export const SIGLAS_UF = [
  'AC',
  'AL',
  'AP',
  'AM',
  'BA',
  'CE',
  'DF',
  'ES',
  'GO',
  'MA',
  'MT',
  'MS',
  'MG',
  'PA',
  'PB',
  'PR',
  'PE',
  'PI',
  'RJ',
  'RN',
  'RS',
  'RO',
  'RR',
  'SC',
  'SP',
  'SE',
  'TO',
];

export const validateNotOnlyNumber = (code) => {
  const valid = /[^0-9.]/;

  return valid.test(code);
};

const API_URL = 'https://api.teashop.com';

let _id = 0;
const id = () => {
  _id += 1;
  return _id;
};

const teas = [
  {
    id: id(),
    name: 'The Whizzer',
    price: 12.34,
  },
  {
    id: id(),
    name: 'Thunderdome 1000',
    price: 55,
  },
  { id: id(), name: 'Ragin Cajun', price: 15.50 },
  { id: id(), name: 'Ragnarok', price: 35.50 },
  { id: id(), name: 'Afternoon Terminator', price: 2.25 },
];

export { teas, API_URL };

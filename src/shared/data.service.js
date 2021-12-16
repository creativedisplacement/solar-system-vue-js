import * as axios from 'axios';

import { format } from 'date-fns';
import { inputDateFormat } from './constants';

import { API } from './config';

const getPlanets = async function() {
  try {
    const response = await axios.get(`${API}/planets`);

    let data = parseList(response);

    const planets = data.map(h => {
      h.originDate = format(h.originDate, inputDateFormat);
      h.fullName = `${h.firstName} ${h.lastName}`;
      return h;
    });
    return planets;
  } catch (error) {
    console.error(error);
    return [];
  }
};

const getPlanet = async function(id) {
  try {
    const response = await axios.get(`${API}/planets/${id}`);
    let planet = parseItem(response, 200);
    planet.fullName = `${planet.firstName} ${planet.lastName}`;
    return planet;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const updatePlanet = async function(planet) {
  try {
    const response = await axios.put(`${API}/planets/${planet.id}`, planet);
    const updatedPlanet = parseItem(response, 200);
    return updatedPlanet;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const addPlanet = async function(planet) {
  try {
    const response = await axios.post(`${API}/planets`, planet);
    const addedPlanet = parseItem(response, 201);
    return addedPlanet;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const deletePlanet = async function(planet) {
  try {
    const response = await axios.delete(`${API}/planets/${planet.id}`);
    parseItem(response, 200);
    return planet.id;
  } catch (error) {
    console.error(error);
    return null;
  }
};

const parseList = response => {
  if (response.status !== 200) throw Error(response.message);
  if (!response.data) return [];
  let list = response.data;
  if (typeof list !== 'object') {
    list = [];
  }
  return list;
};

export const parseItem = (response, code) => {
  if (response.status !== code) throw Error(response.message);
  let item = response.data;
  if (typeof item !== 'object') {
    item = undefined;
  }
  return item;
};

export const dataService = {
  getPlanets,
  getPlanet,
  updatePlanet,
  addPlanet,
  deletePlanet
};

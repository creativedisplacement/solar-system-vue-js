import Vue from 'vue';
import Vuex from 'vuex';

import { dataService } from '../shared';
import {
  ADD_PLANET,
  DELETE_PLANET,
  GET_PLANETS,
  UPDATE_PLANET
} from './mutation-types';

Vue.use(Vuex);

const state = () => ({
  planets: []
});

const mutations = {
  [ADD_PLANET](state, planet) {
    state.planets.unshift(planet); // mutable addition
  },
  [UPDATE_PLANET](state, planet) {
    const index = state.planets.findIndex(h => h.id === planet.id);
    state.planets.splice(index, 1, planet);
    state.planets = [...state.planets];
  },
  [GET_PLANETS](state, planets) {
    state.planets = planets;
  },
  [DELETE_PLANET](state, planetId) {
    state.planets = [...state.planets.filter(p => p.id !== planetId)];
  }
};

const actions = {
  // actions let us get to ({ state, getters, commit, dispatch }) {
  async addPlanetAction({ commit }, planet) {
    const addedPlanet = await dataService.addPlanet(planet);
    commit(ADD_PLANET, addedPlanet);
  },
  async deletePlanetAction({ commit }, planet) {
    const deletedPlanetId = await dataService.deletePlanet(planet);
    commit(DELETE_PLANET, deletedPlanetId);
  },
  async getPlanetsAction({ commit }) {
    const planets = await dataService.getPlanets();
    commit(GET_PLANETS, planets);
  },
  async updatePlanetAction({ commit }, planet) {
    const updatedPlanet = await dataService.updatePlanet(planet);
    commit(UPDATE_PLANET, updatedPlanet);
  }
};

const getters = {
  // parameterized getters are not cached. so this is just a convenience to get the state.
  getPlanetById: state => id => state.planets.find(h => h.id === id)
};

export default new Vuex.Store({
  strict: process.env.NODE_ENV !== 'production',
  state,
  mutations,
  actions,
  getters,
});

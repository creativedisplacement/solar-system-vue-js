<template>
  <div class="content-container">
    <div class="columns">
      <div class="column is-8">
        <div class="section content-title-group">
          <h2 class="title">Admin: Planets</h2>
          <button class="button refresh-button" @click="loadPlanets()">
            <i class="fas fa-sync"></i>
          </button>
          <router-link
            tag="button"
            class="button add-button"
            :to="{ name: 'planet-detail', params: { id: 0 } }"
          >
            <i class="fas fa-plus"></i>
          </router-link>
          <ul>
            <li v-for="planet in planets" :key="planet.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div :key="planet.name" class="name">
                      {{ planet.name }}
                    </div>
                    <div class="description">{{ planet.description }}</div>
                  </div>
                </div>
                <footer class="card-footer">
                  <button
                    class="link card-footer-item"
                    @click="askToDelete(planet)"
                  >
                    <i class="fas fa-trash"></i>
                    <span>Delete</span>
                  </button>
                  <router-link
                    tag="button"
                    class="link card-footer-item"
                    :to="{ name: 'planet-detail', params: { id: planet.id } }"
                  >
                    <i class="fas fa-check"></i>
                    <span>Select</span>
                  </router-link>
                </footer>
              </div>
            </li>
          </ul>
        </div>
        <div class="notification is-info" v-show="message">{{ message }}</div>
      </div>
    </div>
    <Modal
      :message="modalMessage"
      :isOpen="showModal"
      @handleNo="closeModal"
      @handleYes="deletePlanet"
    >
    </Modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Modal from '@/components/modal';

export default {
  name: 'Planets',
  data() {
    return {
      planetToDelete: null,
      message: '',
      showModal: false,
    };
  },
  components: {
    Modal,
  },
  async created() {
    await this.loadPlanets();
  },
  methods: {
    ...mapActions(['getPlanetsAction', 'deletePlanetAction']),
    askToDelete(planet) {
      this.planetToDelete = planet;
      this.showModal = true;
    },
    closeModal() {
      this.showModal = false;
    },
    async deletePlanet() {
      this.closeModal();
      if (this.planetToDelete) {
        await this.deletePlanetAction(this.planetToDelete);
      }
      await this.loadPlanets();
    },
    async loadPlanets() {
      this.message = 'Loading planets, please wait...';
      await this.getPlanetsAction();
      this.message = '';
    },
  },
  computed: {
    ...mapState(['planets']),
    modalMessage() {

      return `Would you like to delete ${this.planetToDelete.fullName} ?`;
    },
  },
};
</script>

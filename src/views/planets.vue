<template>
  <div class="content-container">
    <div class="columns">
      <div class="column is-8">
        <div class="section content-title-group">
          <h2 class="title">Planets</h2>
          <ul>
            <li v-for="planet in planets" :key="planet.id">
              <div class="card">
                <div class="card-content">
                  <div class="content">
                    <div class="image">
                      <img :src="planet.imageUrl" :alt="planet.name" />
                    </div>
                    <div :key="planet.name" class="name">
                      {{ planet.name }}
                    </div>
                    <div class="description">
                      <p>{{ planet.description }}</p>
                      <ul>
                        <li>
                          One day is: {{ planet.rotationPeriod }} earth hours
                        </li>
                        <li>One year is: {{ planet.period }} earth years</li>
                      </ul>
                    </div>
                  </div>
                </div>
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
import { mapActions, mapState } from "vuex";
import Modal from "@/components/modal";

export default {
  name: "Planets",
  data() {
    return {
      planetToDelete: null,
      message: "",
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
    ...mapActions(["getPlanetsAction", "deletePlanetAction"]),
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
      this.message = "Loading planets, please wait...";
      await this.getPlanetsAction();
      this.message = "";
    },
  },
  computed: {
    ...mapState(["planets"]),
    modalMessage() {
      return `Would you like to delete ${this.planetToDelete.fullName} ?`;
    },
  },
};
</script>

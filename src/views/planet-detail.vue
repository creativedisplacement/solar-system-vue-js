<template>
  <div>
    <div class="section content-title-group">
      <h2 class="title">{{ title }}</h2>
      <div class="card">
        <header class="card-header">
          <p class="card-header-title">{{ planet.name }}</p>
        </header>
        <div class="card-content">
          <div class="content">
            <div class="field">
              <label class="label" for="id">id</label>
              <label class="input" name="id" readonly>{{ planet.id }}</label>
            </div>
            <div class="field">
              <label class="label" for="name">Name</label>
              <input class="input" name="name" v-model="planet.name" />
            </div>
            <div class="field">
              <label class="label" for="description">description</label>
              <input
                class="input"
                name="description"
                v-model="planet.description"
              />
              <div class="field">
                <label class="label" for="imageUrl">Image URL</label>
                <input
                  class="input"
                  type="url"
                  name="imageUrl"
                  v-model="planet.imageUrl"
                />
              </div>
              <div class="field">
                <label class="label" for="dayLength">Day length</label>
                <input
                  class="input"
                  type="number"
                  name="dayLength"
                  v-model="planet.rotationPeriod"
                />
              </div>
              <div class="field">
                <label class="label" for="yearLength">Year length</label>
                <input
                  class="input"
                  type="number"
                  name="yearLength"
                  v-model="planet.period"
                />
              </div>
              <div class="field">
                <label class="label" for="ordinal">Order from The Sun</label>
                <input
                  class="input"
                  type="number"
                  name="ordinal"
                  v-model="planet.ordinal"
                />
              </div>
            </div>
          </div>
        </div>
        <footer class="card-footer">
          <button
            class="link card-footer-item cancel-button"
            @click="cancelPlanet()"
          >
            <i class="fas fa-undo"></i>
            <span>Cancel</span>
          </button>
          <button class="link card-footer-item" @click="savePlanet()">
            <i class="fas fa-save"></i>
            <span>Save</span>
          </button>
        </footer>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "PlanetDetail",
  props: {
    id: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      planet: {},
    };
  },
  created() {
    if (this.isAddMode) {
      this.planet = {
        id: undefined,
        name: "",
        description: "",
        imageUrl: "",
        dayLength: "",
        yearLength: "",
        ordinal: "",
      };
    } else {
      this.planet = { ...this.getPlanetById(this.id) };
    }
  },
  computed: {
    ...mapGetters(["getPlanetById"]),
    isAddMode() {
      return !this.id;
    },
    title() {
      return `${this.isAddMode ? "Add" : "Edit"} Planet`;
    },
  },
  methods: {
    ...mapActions(["updatePlanetAction", "addPlanetAction"]),
    cancelPlanet() {
      this.$router.push({ name: "planets" });
    },
    async savePlanet() {
      this.planet.id
        ? await this.updatePlanetAction(this.planet)
        : await this.addPlanetAction(this.planet);
      this.$router.push({ name: "planets" });
    },
  },
};
</script>

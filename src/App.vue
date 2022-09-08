<template>
  <div class="main">
    <div v-if="isLoading" class="loading">
      <span></span>
    </div>
    <div v-else class="app">
      <ModalCity
        v-if="modalOpen"
        v-on:closeModal="toggleModal"
        :APIkey="APIkey"
        :cities="cities"
      />
      <NavBar
        v-on:addCity="toggleModal"
        v-on:editCity="toggleEdit"
        :addCityActive="addCityActive"
        :isDay="isDay"
        :isNight="isNight"
      />
      <router-view
        :cities="cities"
        :edit="edit"
        :APIkey="APIkey"
        v-on:is-day="dayTime"
        v-on:is-night="nightTime"
        v-on:resetDays="resetDays"
        :isDay="isDay"
        :isNight="isNight"
        v-on:addCity="toggleModal"
      />
    </div>
    
  </div>
</template>

<script>
import axios from "axios";
import db from "./firebase/firebaseinit";
import NavBar from "./components/NavBar.vue";
import ModalCity from "./components/ModalCity.vue";

export default {
  name: "App",

  components: {
    NavBar,
    ModalCity,
  },

  data() {
    return {
      isDay: null,
      isNight: null,
      APIkey: "0741fd9519c01ec71bf3fe6ee55e3392",
      cities: [],
      modalOpen: null,
      edit: null,
      addCityActive: null,
      isLoading: true,
    };
  },

  created() {
    this.getCityWeather();
    this.checkRoute();
  },

  methods: {
    getCityWeather() {
      let firebaseDB = db.collection("cities");

      firebaseDB.onSnapshot((snap) => {
        if (snap.docs.length === 0) {
          this.isLoading = false
        }
        snap.docChanges().forEach(async (doc) => {
          if (doc.type === "added" && !doc.doc.Nd) {
            try {
              const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${
                  doc.doc.data().city
                }&units=metric&APPID=${this.APIkey}`
              );
              const data = response.data;
              firebaseDB
                .doc(doc.doc.id)
                .update({
                  currentWeather: data,
                })
                .then(() => {
                  this.cities.push(doc.doc.data());
                  this.isLoading = false;
                });
            } catch (err) {
              console.log(err);
            }
          } else if (doc.type === "added" && doc.doc.Nd) {
            this.cities.push(doc.doc.data());
          } else if (doc.type === "removed") {
            this.cities = this.cities.filter(
              (city) => city.city != doc.doc.data().city
            );
          }
        });
      });
    },

    toggleModal() {
      this.modalOpen = !this.modalOpen;
    },

    toggleEdit() {
      this.edit = !this.edit;
    },

    checkRoute() {
      if (this.$route.name === "add-city") {
        this.addCityActive = true;
      } else {
        this.addCityActive = false;
      }
    },

    dayTime() {
      this.isDay = !this.isDay;
    },

    nightTime() {
      this.isNight = !this.isNight;
    },

    resetDays() {
      this.isDay = false;
      this.isNight = false;
    },
  },

  watch: {
    $route() {
      this.checkRoute();
    },
  },
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: "Quicksand", sans-serif;
}

.day {
  transition: 500ms ease all;
  background-color: rgb(59, 150, 249);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.6);
}

.night {
  transition: 500ms ease all;
  background-color: rgb(20, 42, 95);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
    0 2px 4px -1px rgba(0, 0, 0, 0.6);
}

.main {
  max-width: 1024px;
  height: 100vh;
  margin: 0 auto;

  .container {
    padding: 0 20px;
  }
}

.loading {
    @keyframes spin {
        to {
            transform: rotateZ(360deg)
        }
    }
    
    display: flex;
    height: 100%;
    width: 100%;
    justify-content: center;
    align-items: center;

    span {
        display: block;
        width: 60px;
        height: 60px;
        margin: 0 auto;
        border: 2px solid transparent;
        border-top-color: #142a5f;
        border-radius: 50%;
        animation: spin ease 1000ms infinite;
    }
}
</style>

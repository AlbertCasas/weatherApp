<template>
  <div @click="closeModal" class="modal" ref="modal">
    <div class="modal-wrap" ref="modal-wrap">
      <label for="city-name">Enter Location:</label>
      <input
        type="text"
        name="city-name"
        placeholder="Search By City Name"
        v-model="city"
      />
      <button @click="addCity">Add City</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import db from "../firebase/firebaseinit";

export default {
  name: "ModalCity",
  props: ["APIkey", "cities"],
  data() {
    return {
      city: "",
    };
  },
  methods: {
    closeModal(e) {
      if (e.target === this.$refs.modal) {
        this.$emit("closeModal");
      }
    },

    async addCity() {
      if (this.city === "") {
        alert("This looks empty...");
      }else if(this.cities.some((res) => res.city === this.city.toLowerCase())) {
        alert(`${this.city} already exists!`)
      } else {
        try{
          const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?q=${this.city}&units=metric&APPID=${this.APIkey}`
        );
        const data = await response.data;
        db.collection("cities")
          .doc()
          .set({
            city: this.city.toLowerCase(),
            currentWeather: data,
          })
          .then(() => {
            this.$emit("closeModal");
          });
        } catch{
          alert(`${this.city} does not exist, please try again`)
        }
        
      }
    },

    
  },
};
</script>

<style lang="scss" scoped>

.modal {
  z-index: 101;
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  max-width: 1024px;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  label {
    color: #fff;
  }

  .modal-wrap {
    max-width: 500px;
    border-radius: 8px;
    width: 80%;
    padding: 20px;
    background-color: #31363d;
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
      0 2px 4px -1px rgba(0, 0, 0, 0.06);

    input {
      color: #fff;
      border: none;
      background-color: transparent;
      border-bottom: 1px solid #fff;
      padding: 6px 4px;
      margin: 10px 0 20px;
      width: 100%;
      &:focus {
        outline: none;
      }
    }
    button {
      background-color: #222325;
      color: #fff;
      padding: 6px 20px;
      border-radius: 8px;
      border: none;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06);
    }
  }
}
</style>

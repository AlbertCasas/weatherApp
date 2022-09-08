<template>
<div>
  <header v-if="addCityActive" class="container add-city">
    <nav>
        <span>WeatherApp</span>
        <div class="icons">
            <i @click="editCity" ref="editCity" class="far fa-edit"></i>
            <i @click="refresh" class="fas fa-sync"></i>
            <i @click="addCity" class="far fa-plus"></i>
        </div>
    </nav>
  </header>
  <header v-else class="container" :class="{day: isDay, night: isNight}">
    <nav>
      <router-link class="router-link" :to="{name: 'add-city'}">
        <i class="fas fa-plus"></i>
      </router-link>
      <span>
        {{ new Date().toLocaleString("en-uk", {weekday: "short"}) }},
        {{ new Date().toLocaleString("en-uk", {month: "short"}) }},
        {{ new Date().toLocaleString("en-uk", {day: "2-digit"}) }}
      </span>
      <span>ºC</span>
    </nav>
  </header>
</div>
</template>

<script>
export default {
    name: "NavBar",

    props: ["addCityActive", "isDay", "isNight"],

    methods: {

      addCity() {
        this.$emit("addCity")
      },

      refresh() {
        location.reload()
      },

      editCity() {
        this.$refs.editCity.classList.toggle("edit-active")
        this.$emit("editCity")
      }
    }
}
</script>

<style lang="scss" scoped>

.add-city {
  background-color: #313640;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.6);
}

header {

  z-index: 99;
  position: fixed;
  max-width: 1024px;
  width: 100%;

  nav {
    display: flex;
    color: white;
    padding: 30px 0;
    justify-content: space-between;

    .edit-active {
      color: rgba(210, 75, 75, 1);
    }

    .router-link {
      color: white;
    }
  }

  .icons {

    i {
      font-size: 20px;
    }

    i:nth-child(2),
    i:nth-child(3) {
      margin-left: 16px;
    }
  }

  span {
    font-weight: 600;
  }
}

</style>
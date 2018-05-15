<template>
  <div>
  <div>
    <input class="form-control mr-sm-2 waves-effect" type="text" placeholder="Search" aria-label="Search">
  </div>
    <div v-for="user in users">
      <Contact :name="user.name" :id="user.id"/>
    </div>
  </div>
</template>

<script>
  import Contact from "./Contact";

  export default {
    name: "Users",
    components: {Contact},
    data: function () {
      return {
        users: [
          {id: 1, name: "Tibike1"},
          {id: 2, name: "Tibike2"},
          {id: 3, name: "Tibike3"},
          {id: 4, name: "Tibike4"},
          {id: 5, name: "Tibike5"},
          {id: 6, name: "Tibike6"},
          {id: 7, name: "Tibike7"},
          {id: 8, name: "Tibike8"},
          {id: 9, name: "Tibike9"},
          {id: 10, name: "Tibike10"}
        ]
      };
    }
  }
</script>

<style scoped>


</style>

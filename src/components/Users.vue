<template>
  <div>
  <div class="search-container">
    <input class="form-control mr-sm-2 waves-effect" type="text"  v-model="searchFilter" placeholder="Search" aria-label="Search"/>
  </div>
    <div v-for="user in filteredUsers">
      <Contact :name="user.name" :id="user.id" @click.native="userSelected(user.id)"/>
    </div>
  </div>
</template>

<script>
  import Contact from "./Contact";
  import HttpService from "../services/HttpService"
  var service = HttpService.instance();

  export default {
    name: "Users",
    components: {Contact},
    data: function () {
      return {
        searchFilter:"",
        users:[]//service.getUsers()
      }
    },
    mounted:function(){
      service.bindUsers(this.users);
    },
    methods: {
        userSelected(id){
          this.$emit('userSelected',id);
        }
    },
    computed:{
      filteredUsers: function(){
        var sf = this.searchFilter;
        return this.users.filter(function(usr){
          return usr.name.indexOf(sf) === 0;
        });
      }
    }

  }
</script>

<style scoped>

.search-container{
  margin:1em;
}
</style>

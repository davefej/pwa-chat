<template>

    <div class="nearby">
      <navbar @back="backClicked" :defaultback="true"/>
      <div id="offlinemap" class="offlinemap">A Térkép csak online érhető el!</div>
      <div class="mapcontainer" id="map">

      </div>
    </div>
</template>

<script>
  function initMap() {
  console.log("init");
  }
  import HttpService from "../services/HttpService"
  let service = HttpService.instance();
  import Navbar from "./Navbar";
    export default {
      components:{Navbar},
      name: "NearBy",
      mounted:function(){

          if(typeof mapsloaded != "undefined" && navigator && navigator.onLine){
            service.myLocation(this.locationCB);
          }else{
            $("#offlinemap").show();
          }
      },
        methods: {
          locationCB(position) {
            if(position){

              var cords = {lat: position.coords.latitude, lng:  position.coords.longitude};
              var map;
              map = new google.maps.Map(document.getElementById('map'), {
                center: cords,
                zoom: 8
              });
              var marker = new google.maps.Marker({position: cords, map: map});
            }else{
              //TODO browser update
            }
          },
          backClicked(){
            this.$router.back();
          }
        }
    }
</script>

<style scoped>
.nearby{
  width: 100%;
  height: 100%;
  background: white;
  display: flex;
  flex-direction: column;
}

  .mapcontainer{
    flex:1;
  }

  .offlinemap{
    display: none;
  }
</style>

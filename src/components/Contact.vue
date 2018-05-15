<template>
  <div class="contact-container waves-effect">
    <img class="contact-image" src="../assets/user.png"/>
    <div class="contact-details">
      <div class="contact-name">{{name}}</div>
      <div class="contact-descr">...</div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "Contact",
        props: ['name','id']

    }
</script>

<style scoped>
.contact-container{
  width: 100%;
  padding: 1em;
  display: flex;
  align-items: center;
}
  .contact-image{
    height: 3em;
    width: 3em;
  }

.contact-details{
    flex:1;
    text-align: left;
    margin-left: 2em;
  display: flex;
  flex-direction: column;

}

  .contact-name{
    font-size: 1.2em;
    font-weight: bold;
  }
</style>

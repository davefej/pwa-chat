<template>
<div class="login-container">
  <!-- Default form login -->
  <div  id="login" class="card mx-xl-5">
    <div class="card-body">

      <!--Header-->
      <div class="form-header login-label rounded">
        <h3>Login:</h3>
      </div>

      <!-- Default input email -->
      <label class="grey-text font-weight-light">Your Name</label>
      <input type="text" id="loginUser" v-model="loginUser" class="form-control">

      <br>

      <!-- Default input password -->
      <label  class="grey-text font-weight-light">Your password</label>
      <input type="password" id="loginPass" v-model="loginPass" class="form-control">

      <div class="text-center mt-4">
        <button class="btn btn-primary waves-effect waves-light"  @click="login">Login</button>
      </div>

    </div>

    <!--Footer-->
    <div class="modal-footer">
      <div class="options font-weight-light">
        <p>Not a member? <span class="switchLogin" @click="switchLogin">Sign Up</span></p>
      </div>
    </div>

  </div>
  <!-- Default form login -->

  <div  id="signup" class="card mx-xl-5">
    <div class="card-body">

      <!--Header-->
      <div class="form-header login-label rounded">
        <h3>Sign Up:</h3>
      </div>

      <!-- Default input email -->
      <label  class="grey-text font-weight-light">Your Name</label>
      <input type="text" id="signupUser" v-model="signupUser" class="form-control">

      <br>

      <!-- Default input password -->
      <label  class="grey-text font-weight-light">Your password</label>
      <input type="password" id="signupPass" v-model="signupPass" class="form-control">

      <br>

      <!-- Default input password -->
      <label  class="grey-text font-weight-light">Your password again</label>
      <input type="password" id="signupPassAgain" v-model="signupPassAgain"  class="form-control">


      <div class="text-center mt-4">
        <button class="btn btn-primary waves-effect waves-light"  @click="signup">Login</button>
      </div>

    </div>

    <!--Footer-->
    <div class="modal-footer">
      <div class="options font-weight-light">
        <p>Already a member? <span class="switchLogin" @click="switchLogin">Login</span></p>
      </div>
    </div>

  </div>

</div>
</template>

<script>
  import HttpService from "../services/HttpService"
  let service = HttpService.instance();
    export default {
      name: "Login",
      data:function(){
        return {
          loginUser:"",
          loginPass:"",
          signupUser:"",
          signupPass:"",
          signupPassAgain:""
        }
      },
      methods:{
        login(){
          service.logIn(this.loginUser,this.loginPass,this.back);
        },
        signup(){
          if(this.signupPassAgain != this.signupPass){
            alert("A két jelszó nem egyezik!")
            return;
          }
          service.signUp(this.signupUser,this.signupPass,this.back);
        },
        switchLogin(){
          if($("#login").is(":visible")){
            $("#login").hide();
            $("#signup").show();
          }else{
            $("#signup").hide();
            $("#login").show();
          }
        },
        back(){
          this.$router.go(-1);
        }
      }
    }
</script>

<style scoped>
.login-container{
  max-width: 400px;
  margin:auto;
  margin-top: 15vh;
}

  .login-label{
    background-image: linear-gradient(120deg, #4285f4 0%, #8ec5fc 100%);
    box-shadow: rgba(0, 0, 0, 0.18) 0px 5px 11px 0px, rgba(0, 0, 0, 0.15) 0px 4px 15px 0px;
    color: rgb(255, 255, 255);
    height: 100px;
    margin-bottom: 48px;
    margin-top: -50.08px;
    padding-bottom: 16px;
    padding-left: 16px;
    padding-right: 16px;
    padding-top: 16px;
    text-align: center;
    -moz-text-size-adjust: 100%;
    -ms-text-size-adjust: 100%;
    text-size-adjust: 100%;
  }

  #signup{
    display: none;
  }


  .switchLogin{
    cursor:pointer;
  }
</style>

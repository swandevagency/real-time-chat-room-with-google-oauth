<template>
  <div class="container">
    <h1 class="welcome">welcome</h1>
    <NuxtLink to='/register' class="link"><button class="btn">register</button></NuxtLink>
    <NuxtLink to='/login' class="link"><button class="btn">login</button></NuxtLink>
  </div>
</template>

<script>
export default {
  
  methods:{
    getMessage(){
      
    }
  }
}

</script>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  .container{
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: black;
  }
  .link{
    width: 10%;
    height: 5%;
    margin: 10px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
  }
  .btn{
    margin: 0;
    border: 1px solid white;
    color: white ;
    font-size: 20px;
    background-color: transparent;
    width: 100%;
    padding: 10px;
    cursor: pointer
  }
  .welcome{
    position: relative;
    bottom: 10%;
    text-align: center;
    font-size: 60px;
    color: white;
  }
</style>

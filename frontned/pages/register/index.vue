<template>
  <div class="container">
      <input type="text" class="input" v-model="firstname" placeholder="firstname">
      <input type="text" class="input" v-model="lastname" placeholder="lastname">
      <input type="text" class="input" v-model="username" placeholder="username">
      <input type="text" class="input" v-model="password" placeholder="password">
      <input type="text" class="input" v-model="email" placeholder="email">
      <input type="text" class="input" v-model="number" placeholder="phone-number">
      <button class="button" @click="register">register</button>
      <button class="button buttonn" @click="googleurl">sign Up with google</button>
      
  </div>
</template>

<script>
export default {
    data(){
        return{
            firstname: '',
            lastname : '',
            username : '',
            password : '',
            email : '',
            number : ''
        }
    },
    methods: {
        register(){
            const credentials = {
                firstname : this.firstname,
                lastname : this.lastname,
                username : this.username,
                password : this.password,
                email : this.email,
                number : this.number
            }
            console.log(credentials)
            this.$axios.post('http://localhost:5000/register',credentials)
            .then(res =>{
                console.log(res)
            })
            .catch(err =>{
                console.log(err)
            })
        },
        googleurl(){
            this.$axios.get('http://localhost:5000/google')
            .then(res =>{
            console.log(res.data)
            location.href = `${res.data}`
            })
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
    .input{
        height: 5%;
        outline: none;
        width:30%;
    }
    .button{
        width: 10%;
        margin-top: 20px;
        font-size: 20px;
        height: 5%;
        padding: 0;
        cursor: pointer;
    }
    .buttonn{
        background: rgb(131,58,180);
        background: linear-gradient(90deg, rgba(131,58,180,1) 0%, rgba(253,29,29,1) 50%, rgba(252,176,69,1) 100%); 
    }
    .link{
        text-decoration: none;
        color: white;
    }
</style>
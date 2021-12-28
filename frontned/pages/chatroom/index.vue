<template>
  <div class="full-page" v-if="isAuthenticated">
    <h1 class="welcome" v-show="user">welcome to uncle's chatroom {{user}}</h1>
    <div class="wrapper" id="messages-wrapper">
      <ul>
        <li v-for="messageObject in messages" :key="messageObject._id">
          <div class="msg test">{{messageObject.sender}}</div>
          <p class="msg dot">:</p>
          <div class="msg">{{messageObject.text}}</div>
        </li>
      </ul>
    </div>
    <div class="send-text">
      <input type="text" class="text" v-model="message" placeholder="type your bullshit here" id="message-input">
      <button @click="send" class="send">send</button>
    </div>
  </div>
</template>

<script>
export default {
  data(){
    return{
      message: '',
      isAuthenticated : false,
      user : '',
      messages : [],
    }
  },
  beforeMount(){
    this.$axios.get('http://localhost:5000/chatroom',{withCredentials: true})// or withCredentials : 'indclude'
    .then(res =>{
      console.log(res.data.messages)
      if(res.status == 200){
        this.isAuthenticated = true
        this.user = res.data.user
        this.messages = res.data.messages
      }
    })
    .catch(err =>{
      console.log('server responed with an error')
      this.$router.push('/login')
    })
  },
  mounted(){
    this.socket = this.$nuxtSocket({
      name:"work",
      channel:"/",
      reconnection:false
    })
    this.socket.on('message', pm =>{
      console.log(pm)
      this.messages.unshift({sender : pm.user, text : pm.message})

    })
  },
  methods :{
    send(){
      if(this.message === ''){
        return
      }
      //this.messages.unshift({text: this.message})
      const message = this.message
      const user = this.user
      const body = {
        message
      }
      const pmObject ={
        user,
        message
      }
      this.socket.emit('chatMessage',pmObject)
      console.log('this button is working')
      const messagesWrapper = document.getElementById("messages-wrapper");
      const messageInput = document.getElementById("message-input");
      messagesWrapper.scrollTop = messagesWrapper.scrollHeight;
      messageInput.focus();
      this.$axios.post('http://localhost:5000/chatroom',body,{withCredentials: true})
      .then(res =>{
        console.log(res)
        this.message = ''
      })
      .catch(error =>{
        console.log(error);
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
  .full-page{
    width: 100vw;
    height: 100vh;
    background-color: black;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .wrapper{
    width: 40%;
    max-width: 40%;
    height: 85%;
    max-width: 85%;
    overflow: scroll;
    scrollbar-color:rgb(26, 81, 133);
    overflow-x: hidden;
    background-color: rgb(26, 81, 133);
    border-radius: 5px;
    margin-bottom: 10px;
  }
  h1{
    color: grey;
    margin-bottom: 5px;
    font-size: 28px;
  }
  .send-text{
    width: 40%;
    height: 5%;
    background-color: black;
    border-radius: 5px;
    display: flex;
    justify-content: space-between;
  }
  .text{
    width: 79%;
    height: 100%;
    background-color: white;
    color: rgb(26, 81, 133);
    outline: none;
    border: none;
    border-radius: 5px;
    font-size: 25px;
  }
  .send{
    background-color: rgb(26, 81, 133);
    width: 20%;
    height: 100%;
    color: white;
    border: none;
    font-size: 25px;
    border-radius: 5px;
    cursor: pointer;
  }
  li{
    display: flex;
  }
  ul{
    display: flex;
    flex-direction:column-reverse;
  }
  .msg{
    font-size: 20px;
    color: white;
    margin: 5px 5px;
    width: fit-content;
    max-width: 80%;
    background-color: rgb(6, 34, 61);
    border-radius: 5px;
    padding: 10px 5px;
  }
  .test{
    background-color: black;
    display: flex;
    align-items: center;
    text-align: center;
  }
  .dot{
    background-color: transparent;
    color: rgb(6, 34, 61);
    margin: 0;
    padding: 0;
    font-size: 40px;
    display: none;
  }
</style>
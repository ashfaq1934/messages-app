<template>
<div class="section">
    <div class="form-container">
        <form action="" method="POST" @submit.prevent="handleSubmit">
            <div class="form-row">
                <label for="recipient">Recipient</label>
                <select name="recipient" id="recipient" v-model="recipient">
                    <option value="Person">Person</option>
                    <option value="Another Person">Another Person</option>
                </select>
            </div>
            <div class="form-row">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" v-model="title">
            </div>
            <div class="form-row">
                <label for="message">Message</label>
                <textarea type="text" name="message" id="message" v-model="message"></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
    <Messages />
</div>
</template>

<script>
import Messages from "@/components/Messages.vue";
import { getUser, getAuthToken } from '../services/auth'
import axios from 'axios';

export default {
  components: {
    Messages
  },
  data() {
      return {
          recipient: "",
          title: "",
          message: ""
      }
  },
  methods: {
      async handleSubmit(){
          let data = {
              recipient: this.recipient,
              title: this.title,
              message: this.message,
              user: getUser()
          }
          JSON.stringify(data);
          let response = await axios({
              method: 'post',
                url: 'http://localhost:7000/messages/new/',
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${getAuthToken()}`
                }
            });
            console.log(response);
      }
  },
};
</script>

<style scoped>
.section{
    display: flex;
}
.form-container{
    flex-grow: 3;
}
form{
    margin-left: 10%;
}
form button{
    float: left;
}
.form-row{
    margin-bottom: 1%;
}
.form-row *{
    display: flex;
    padding: 10px;
}
#recipient{
    width: 40%;
    padding: 0.5%;
}
#title{
    width: 40%;
    padding: 0.5%;
}
#message{
    width: 60%;
    height: 300px;
}
</style>
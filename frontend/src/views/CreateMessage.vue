<template>
<div class="section">
    <div class="form-container">
        <form action="" method="POST" @submit.prevent="handleSubmit">
            <div class="form-row">
                <label for="recipient">Recipient</label>
                
                <select name="recipient" id="recipient" v-model="recipient">
                    <option v-for="recipientOption in recipientsList" v-bind:key="recipientOption.recipient" :value="recipientOption.recipient">{{ recipientOption.recipient }}</option>
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
            <button type="button" v-on:click="encrypt()">Encrypt</button>
            <button type="button" v-on:click="decrypt()">Decrypt</button>
        </form>
    </div>
    <Messages />
</div>
</template>

<script>
import Messages from "@/components/Messages.vue";
import { getUser, getAuthToken } from '../services/auth';
import axios from 'axios';
import { encode, decode } from '@reverse/encoder';

export default {
  components: {
    Messages
  },
  data() {
      return {
          recipient: "",
          title: "",
          message: "",
          recipientsList: [],
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
            this.$router.push('/view/' + response.data.uuid);
      },
        async getRecipients(){
          let response = await axios({
              method: 'post',
                url: 'http://localhost:7000/recipients/',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${getAuthToken()}`
                }
            });
            this.recipientsList = response.data.recipients;
        },
        encrypt() {
            let text = encode(this.message);
            this.message = text;
        },
        decrypt() {
            let text = decode(this.message);
            this.message = text;
        }
  },
  mounted() {
      this.getRecipients()
  },
};
</script>

<style scoped>
.section{
    display: flex;
}
.form-container{
    flex-grow: 6;
    margin-top: 2%;
}
form{
    margin-left: 10%;
}
form button{
    float: left;
    color: whitesmoke;
    padding: 0.5%;
    margin-right: 1%;
    background-color: #299464;
    margin-top: 1%;
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
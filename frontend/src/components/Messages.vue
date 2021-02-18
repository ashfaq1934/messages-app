<template>
<aside class="message" :class="accordionClasses">
    <div class="message-header" @click="toggleAccordion">
      <span>Messages</span>      
    </div>
    <div class="message-body">
        <ul v-if="messages.length" class="message-content">
            <li v-for="message in messages" v-bind:key="message"><router-link :to="{ name: 'ViewMessage', params: {uuid: message.uuid } }">{{ message.sender }}</router-link></li>
        </ul>
        <h4 v-else>No Messages</h4>
    </div>
</aside>
</template>

<script>
import axios from 'axios';
import { getUser, getAuthToken } from '../services/auth';
export default {
  data() {
    return {
      isOpen: true,
      messages: [],
    }
  },
  methods: {
    async getMessages(){
      let data = {
              user: getUser(),
          }
          JSON.stringify(data);
          let response = await axios({
              method: 'post',
                url: 'http://localhost:7000/messages/',
                data: data,
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `${getAuthToken()}`
                }
            });
            this.messages = response.data.messages
    },
    toggleAccordion: function() {
      this.isOpen = !this.isOpen;
    }
  },
  mounted() {
    this.getMessages();
  },
  computed: {
    accordionClasses: function() {
        return {
          'is-closed': !this.isOpen,
          'is-primary': this.isOpen,
          'is-dark': !this.isOpen
        };
    }
  }
};
</script>

<style scoped>
aside{
  flex: 1;
  display: block;
  color: whitesmoke;
}
.message {
  max-width: 15%;
  margin-left: auto;
  margin-right: auto;
}
.message-header {
  cursor: pointer;
  padding: 5%;
  color: whitesmoke;
  background-color: #df8109;
  border: 1px solid black;
}
.message-body   {
  background-color: #1f252b;
  overflow: hidden;
  transition: 0.3s ease all;
  border-bottom: 1px solid black;
  border-left: 1px solid black;
}
.message-content{
  margin: 0;
  list-style: none;
}
.message-body > ul{
  padding: 0;
}
.message-content li{
  padding: 6%;
  width: 100%;
  border-bottom: 1px solid black;
}
.message-content li a{
  color: whitesmoke !important;
  text-decoration: none;
}
.message-content li:last-child{
  border-bottom: none;
}
.is-closed .message-body {
  max-height: 0;
}
.message-content {
  padding: 20px;
}
</style>

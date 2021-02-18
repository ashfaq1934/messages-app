<template>
<div class="section">
  <div class="home">
    <div class="container">
      <img src="../assets/lock-6-256.png" alt="">
      <h1>Welcome</h1>
      <p>This a website application that allows users to send messages with the option to encode and decode messages.</p>
    </div>
  </div>
  <Messages v-if="isLoggedIn()" />
</div>
</template>

<script>
import Messages from "@/components/Messages.vue";
import { isLoggedIn } from '../services/auth'

export default {

  name: "Home",
  components: {
    Messages
  },
  methods: {
    isLoggedIn() {
        return isLoggedIn()
      }
  },
};
</script>
<style scoped>
.section{
  display: flex;
}
.home{
  flex-grow: 3;
}
.container{
  margin-top: 5%;
  justify-content: center;
}
.container p{
  font-size: large;
}
</style>

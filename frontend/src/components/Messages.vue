<template>
<aside>
  <div class="messages">
    <h3>Messages</h3>
    <button v-on:click="getMessages()"></button>
  </div>
</aside>
</template>

<script>
export default {
  methods: {
    getMessages(){
      
    }
  },
  
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
aside{
  flex: 1;
  display: block;
}
.messages{
  background-color: teal;
  padding: 20px;
}
</style>

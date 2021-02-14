<template>
  <div id="app">
    <div id="nav">
      <div class="left">
      <span class="site-name">MessageApp</span>
      <span class="create-message"><router-link to="/create-message">New Message</router-link></span>
      </div>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
        <li v-if="isLoggedIn()"><router-link to="/logout">Logout</router-link></li>
        <li v-else><router-link to="/login">Login</router-link></li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script>
import { isLoggedIn } from './services/auth'

export default {
  methods: {
        isLoggedIn() {
            return isLoggedIn()
        }
    }
}
</script>

<style>
body{
  margin: 0;
}
.left{
  display: flex;
  align-self: center;
  flex-grow: 5;
}
.site-name{
  margin-right: 3%;
  font-size: 1.5em;
  align-self: center;
}
.create-message{
  align-self: center;
  background-color: #369c6e;
  padding: 1%;
  border-radius: 500px;
  font-weight: bold;
}
#app {
  background-color: #404040;
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: whitesmoke;
}

#app a{
  color: #42b983;
}

#nav {
  padding: 15px;
  display: flex;
  width: 60%;
  margin-left: auto;
  margin-right: auto;
}

#nav a {
  font-weight: bold;
  color: whitesmoke;
  text-decoration: none;
}

#nav > ul{
  display: flex;
  flex-grow: 2;
}

#nav > ul > li{
  margin-right: 8%;
  list-style-type: none;
}

.account{
  align-self: center;
  flex-grow: 2;
}

#nav ul a.router-link-exact-active {
  color: #42b983;
}
</style>

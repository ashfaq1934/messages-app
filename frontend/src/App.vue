<template>
<div>
  <link rel="stylesheet" href="https://pro.fontawesome.com/releases/v5.10.0/css/all.css" integrity="sha384-AYmEC3Yw5cVb3ZcuHtOA93w35dYTsvhLPVnYs9eStHfGJvOvKxVfELGroGkvsg+p" crossorigin="anonymous"/>
  <div id="app">
    <header>
      <div id="nav">
        <div class="left">
        <span class="site-name">MessageApp</span>
        <span class="create-message"><router-link to="/create">New Message</router-link></span>
        </div>
        <ul>
          <li><router-link to="/">Home</router-link></li>
          <li v-if="isLoggedIn()"><router-link to="/logout">Logout</router-link></li>
          <li v-else><router-link to="/login">Login</router-link></li>
        </ul>
      </div>
    </header>
    <router-view />
  </div>
</div>
</template>

<script>
import { isLoggedIn } from './services/auth';

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
  background-color: #df8109;
  padding: 1%;
  border-radius: 500px;
  font-weight: bold;
}
#app {
  background-color: #1f252b;
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

#app header{
  background-color: rgba(25, 27, 31, 0.8);
  border-bottom: 1px solid whitesmoke;
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

#nav > ul > li> a{
  padding: 10%;
}

.account{
  align-self: center;
  flex-grow: 2;
}

#nav ul a.router-link-exact-active {
  color: #df8109;
  border-bottom: 5px solid #df8109;
}
</style>

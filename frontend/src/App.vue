<template>
  <div id="app">
    <div id="nav">
      <span class="site-name">StudyNote</span>
      <ul>
        <li><router-link to="/">Home</router-link></li>
        <li><router-link to="/about">About</router-link></li>
      </ul>
      <div class="account">
        <span><a href="">Login</a></span>
      </div>
    </div>
    <router-view />
  </div>
</template>

<style>
body{
  margin: 0;
}
.site-name{
  display: flex;
  color: whitesmoke;
  align-self: center;
  flex-grow: 1;
}
#app {
  display: flex;
  min-height: 100vh;
  flex-direction: column;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 15px;
  background-color: #404040;
  display: flex;
}

#nav a {
  font-weight: bold;
  color: whitesmoke;
  text-decoration: none;
}

#nav > ul{
  display: flex;
  flex-grow: 13;
}

#nav > ul > li{
  margin-right: 1%;
}

.account{
  align-self: center;
  flex-grow: 2;
}

#nav a.router-link-exact-active {
  color: #42b983;
}
</style>

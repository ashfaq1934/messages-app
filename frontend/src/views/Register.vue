<template>
    <div>
        <form method="POST" action="" @submit.prevent="handleSubmit">
            <div class="form-container">
                <h1>Register</h1>
                <div>
                    <label for="email">Email</label> <br>
                    <input type="email" v-model="email" name="email">
                </div>
                <div>
                    <label for="password">Password</label> <br>
                    <input type="password" v-model="password" name="password">
                </div>
                <button type="submit">Submit</button>
                <p>Already have an account? Login <router-link to="/login">here</router-link></p>
            </div>
        </form>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        data() {
            return {
                email: '',
                password: ''
            }
        },
        methods: {
            async handleSubmit(){
                let data = {
                    email: this.email,
                    password: this.password
                };
                JSON.stringify(data);
                await axios({
                    method: 'post',
                    url: 'http://localhost:7000/register/',
                    data: data,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                this.$router.push({ name: 'Login' });
            }
        },
    }
</script>

<style scoped>
form {
    display: flex;
    padding: 5%;
}
.form-container {
    margin-left: auto;
    margin-right: auto;
}
.form-container h1{
    text-align: left;
}
.form-container button{
    padding: 3%;
    float: left;
    margin-bottom: 2%;
    background-color: #299464;
    border-radius: 3px;
    color: whitesmoke;
}
.form-container p{
    float: left;
}
.form-container div{
    text-align: left;
    margin-bottom: 8%;
}
.form-container div input{
    padding: 2%;
    border-radius: 2%;
    width: 100%;
}
</style>
<template>
    <div>
        <h3>Login</h3>
        <form action="" method="post" @submit.prevent="handleSubmit">
            <label for="email">Email</label>
            <input type="email" v-model="email" name="email" id=""><br>
            <label for="password">Password</label>
            <input type="password" v-model="password" name="password" id=""><br>
            <input type="submit" value="Submit">
        </form>
    </div>
</template>

<script>
    import axios from 'axios';
    import { setAuthToken } from '../services/auth'
    
    export default {
        data(){
            return{
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
                let response = await axios({
                    method: 'post',
                    url: 'http://localhost:7000/login/',
                    data: data,
                    headers: {
                        'Content-Type': 'application/json',
                    }
                });
                if(response.status == 200){
                    setAuthToken(response.data.accessToken)
                    this.$router.push({ name: 'Home' });
                }

            }
        }
    }
</script>

<style scoped>

</style>
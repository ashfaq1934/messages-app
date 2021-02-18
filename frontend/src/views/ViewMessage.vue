<template>
<div class="section">
    <div class="outer">
        <div class="container">
            <div class="row">
                <label for="sender">From</label>
                <input type="text" name="sender" id="sender" v-model="sender" readonly>
            </div>
            <div class="row">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" v-model="title" readonly>
            </div>
            <div class="row">
                <label for="message">Message</label>
                <textarea type="text" name="message" id="message" v-model="message" readonly></textarea>
            </div>
            <button type="button" v-on:click="encrypt()">Encrypt</button>
            <button type="button" v-on:click="decrypt()">Decrypt</button>
        </div>
    </div>
    <Messages />
</div>
</template>

<script>
import Messages from "@/components/Messages.vue";
import { getAuthToken } from '../services/auth';
import axios from 'axios';
import { encode, decode } from '@reverse/encoder';

    export default {
        components: {
            Messages
        },
        data() {
            return {
                sender: "",
                title: "",
                message: "",
            }
        },
        methods: {
            async getMessage(){
                let data = JSON.stringify({uuid: this.$route.params.uuid})
                let response = await axios({
                method: 'post',
                    url: `http://localhost:7000/messages/${this.$route.params.uuid}`,
                    data: data,
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `${getAuthToken()}`
                    }
                });
                this.sender = response.data.sender;
                this.title = response.data.title;
                this.message = response.data.message;
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
            this.getMessage()
        },
    }
</script>

<style scoped>
.section{
    display: flex;
}
.outer{
    flex-grow: 3;
}
.container{
    margin-left: 10%;
    margin-top: 2%;
}

.container button{
    float: left;
    color: whitesmoke;
    padding: 0.5%;
    margin-right: 1%;
    background-color: #299464;
    margin-top: 1%;
}
.row{
    margin-bottom: 1%;
}
.row *{
    display: flex;
    padding: 10px;
}
#sender{
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
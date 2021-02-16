<template>
<div class="section">
    <!-- <article>{{ this.$route.params.uuid }}</article> -->
    <div class="outer">
        <div class="container">
            <div class="row">
                <label for="sender">From</label>
                <input type="text" name="title" id="title" v-model="sender" readonly>
            </div>
            <div class="row">
                <label for="title">Title</label>
                <input type="text" name="title" id="title" v-model="title" readonly>
            </div>
            <div class="row">
                <label for="message">Message</label>
                <textarea type="text" name="message" id="message" v-model="message" readonly></textarea>
            </div>
            <button type="submit">Encrypt</button>
        </div>
    </div>
    <Messages />
</div>
</template>

<script>
import Messages from "@/components/Messages.vue";
import { getAuthToken } from '../services/auth';
import axios from 'axios';

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
}

.container button{
    float: left;
}
.row{
    margin-bottom: 1%;
}
.row *{
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
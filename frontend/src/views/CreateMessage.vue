<template>
    <div>
        <form action="">
            <div class="form-row">
                <label for="recipient">Recipient</label>
                <select name="recipient" id="recipient">
                    <option value="recipient_name">Person</option>
                </select>
            </div>
            <div class="form-row">
                <label for="title">Title</label>
                <input type="text" name="title" id="title">
            </div>
            <div class="form-row">
                <label for="message">Message</label>
                <textarea type="text" name="message" id="message"></textarea>
            </div>
            <button type="submit">Submit</button>
        </form>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped>
form{
    margin-left: 10%;
}
form button{
    float: left;
}
.form-row{
    margin-bottom: 1%;
}
.form-row *{
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
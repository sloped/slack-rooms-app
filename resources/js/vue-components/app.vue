<template>
<div class="app">
    
    <nav class="nav">
        <div class="nav-left">
            <span v-for="room in rooms" class="nav-item"><router-link :to="{name: 'events', params: {name: room.name}}">{{room.name}}</router-link></span>
        </div>
        <div class="nav-right">
            <span class="nav-item">Current Time: {{now}}</span>
        </div>
    </nav>
    <div class="columns">
        <router-view></router-view>
    </div>
    
</div>
</template>

<script>
import apolloProvider from '../apollo/apolloProvider.js';
import router from '../routes/index.js';
import moment from 'moment';
import {rooms} from '../graphql/graphql.js';
import later from 'later';
import {every_minute} from '../resources/schedules';
    export default {
        apolloProvider,
        router,
        data() {
            return {
                rooms : [],
                currentMoment: moment()
            };
        },
        computed : {
            now() {
                return this.currentMoment.format("dddd, MMMM Do YYYY, h:mm a");
            }
        },
        methods: {
            updateNow() {
                this.currentMoment = moment(); 
            }
        },
        created() {
            interval = later.setInterval(this.updateNow, every_minute )
        },
        destroyed() {
            interval.clear();
        },
        apollo: {
            rooms
        }
        
    };

</script>

<style lang="sass" scoped>



</style>

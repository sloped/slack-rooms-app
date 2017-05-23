<template>
<div class="column component available-rooms-component" >
<div class="columns">
    <div class="column is-half">
        <h1>Available</h1>
        <ul class="has-text-centered">
            <li v-for="room in available"><router-link :to="{name: 'events', params: {name: room.name}}">{{room.name}}</router-link></li>
        </ul>
    </div>
    <div class="column is-half">
        <h1>Occupied</h1>
        <ul class="has-text-centered">
            <li v-for="room in occupied"><router-link :to="{name: 'events', params: {name: room.name}}">{{room.name}}</router-link></li>
        </ul>
    </div>
</div>
</div>
</template>

<script>
import moment from 'moment';
import roomEvents from '@/graphql/room_events.js';
import later from 'later';
import * as schedules from '@/resources/schedules';
var interval;
    export default {
        data() {
            return {
                rooms: [],
                now : moment(),
                interval: ''
            };
        },
        computed : {
            available() {
                return this.rooms.filter( (room) => {
                    if (typeof room.events.find( (event) => {
                        return this.now.isBetween(moment(event.startTime), moment(event.endTime));
                    }) === 'object') {
                        return false;
                    }
                    return true;
                });
            },
            occupied() {
                return this.rooms.filter( (room) => {
                    if (typeof room.events.find( (event) => {
                        return this.now.isBetween(moment(event.startTime), moment(event.endTime));
                    }) === 'object') {
                        return true;
                    }
                    return false;
                });
            }
        },
        methods: {
            updateNow() {
                this.now = moment();
            }
        },
        created() {
            interval = later.setInterval(this.updateNow, schedules.every_minute );
        },
        destroyed() {
            interval.clear();
        },
         apollo: {
            rooms: {
                 query: roomEvents,
                 pollInterval: 1000 * 60 * 5
            }
        }
    };

</script>

<style lang="scss" scoped>

</style>

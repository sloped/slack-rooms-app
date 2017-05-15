<template>
<div class="column is-half is-offset-one-quarter component event-component">
    
    <div class="current box" v-if="currentEvent">
        <div class="occupied">Occupied</div>
        <h1>Details:</h1>
        <span class="eventName">{{currentEvent.name}}</span>
        <span class="eventEnd">Ends in {{currentEvent.endTime | from}}</span>
        <span class="eventOrganizer">{{currentEvent.creator}}</span>
    </div>

    <div class="current box" v-if="nextEvent">
        <h1>Next:</h1>
        <span class="eventName">{{nextEvent.name}}</span>
        <span class="eventStart">Starts in {{nextEvent.startTime | from}}</span>
        <span class="eventEnd">{{nextEvent.endTime | date}}</span>
        <span class="eventOrganizer">{{nextEvent.creator}}</span>
    </div>


    <div class="upcoming box" v-if="comingUp.length">
        <h1>Upcoming</h1>
        <ul>
            <li v-for="event in comingUp">{{event.startTime | date}} - {{event.name}}</li>
        </ul>
    </div>
</div>
</template>

<script>
import moment from 'moment';
import {events} from '../graphql/graphql.js';
    export default {
        props: ['name'],
        filters: {
            date(date) {
                return moment(date).format('dddd [at] h:mm:a')
            },
            from(date) {
                return moment(date).fromNow(true)
            }
        },
        data() {
            return {
                events : []
            };
        },
        computed: {
            now() {
                return moment();
            },
            comingUp() {
                return this.events.slice(2);
            },
            currentEvent() {
                return this.events.find( (event) => {
                    return this.now.isBetween(moment(event.startTime), moment(event.endTime));
                });
            },
            nextEvent() {
                return this.events.find( (event) => {
                    return this.now.isBefore(moment(event.startTime));
                });
            },

        },
        apollo: {
            events: {
                query: events,
                variables() {
                    return  { 
                        roomName: this.name
                    }
                },
                pollInterval: 10000
            }
        }
        
    };

</script>

<style lang="sass" scoped>



</style>

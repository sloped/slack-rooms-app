<template>
<div class="column is-half is-offset-one-quarter component event-component">
    
    <div class="current" v-if="currentEvent">
        <h1 class="status occupied">Occupied</h1>
        <div class="box">
            <div class="currentEventEnd">Ends in {{currentEvent.endTime | from}}</div>
            <div class="columns">
            <div class="eventName column is-two-thirds">{{currentEvent.name}}</div>
            <div class="eventOrganizer column is-one-third"><span>Organizer: {{currentEvent.creator}}</span></div>
            </div>
           
            
            <div class="eventAttendees">Attendees</div>
            <ul>
                <li v-for="attendee in currentEvent.attendees">{{attendee}}</li>
            </ul>
        </div>
    </div>
    <div v-else>
        <h1 class="status available">Available</h1>
    </div>

    <div class="next" v-if="nextEvent">
        <h1>Next</h1>
        <div class="box">
            <div class="columns">
                <div class="eventName column is-two-thirds">{{nextEvent.name}}</div>
                <div class="eventOrganizer column is-one-third"><span>Organizer: {{nextEvent.creator}}</span></div>
            </div>
            <div class="columns">
            <div class="eventStart column is-half">Starts: {{nextEvent.startTime | date}}({{nextEvent.startTime | from }})</div>
            <div class="eventEnd column is-half">Ends: {{nextEvent.endTime | date}}</div>
            </div>
        </div>
    </div>


    <div class="upcoming" v-if="comingUp.length">
        <h1>Upcoming</h1>
        <div class="box">
            <ul>
                <li v-for="event in comingUp">{{event.startTime | date}} - {{event.name}}</li>
            </ul>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment';
import {events} from '../graphql/graphql.js';
import later from 'later';
import {every_minute} from '../resources/schedules';
var interval;
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
                events : [],
                now: moment()
            };
        },
        computed: {
            comingUp() {
                var slice = 1;
                return this.events.filter( (event) => {
                    if( this.now.isBetween(moment(event.startTime), moment(event.endTime)) ) {
                        slice ++;
                        return false;
                    }
                    return true;
                }).slice(slice);
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
        methods: {
            updateNow() {
                this.now = moment();
            }
        },
        created() {
            interval = later.setInterval(this.updateNow, every_minute )
        },
        destroyed() {
            interval.clear();
        },
        apollo: {
            events: {
                query: events,
                variables() {
                    return  { 
                        roomName: this.name
                    }
                },
                pollInterval: 1000 * 60 * 5
            }
        }
        
    };

</script>

<style lang="scss" scoped>
h1 {
    font-size:1.6rem;
    font-weight:700;
    text-align:center;
    margin-top:.5rem;
    margin-bottom:.5rem;
}

.status {
    font-size: 2rem;
    font-weight:700;
    text-align:center;
    margin-bottom:.5rem;
}
.currentEventEnd {
    font-size:1rem;
    font-weight:700;
    margin-bottom:.5rem;
}

.eventName {
    font-weight:700;
    font-size:1.2rem;
}
.eventOrganizer {

    text-align:right;
}
.eventAttendees {
    font-weight:700;
}
</style>

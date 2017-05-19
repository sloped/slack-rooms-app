<template>
<div class="column is-half is-offset-one-quarter component event-component">
    <div v-if="have_events">
        <current-event :event="currentEvent"></current-event>
        <next-event :event="nextEvent"></next-event>
        <upcoming-events :events="comingUp"></upcoming-events>
    </div>
    <div v-else> 
        <h1 class="status available">Available</h1>
        <div class="box">
            <h2>No Events Scheduled for Today or Tomorrow</h2>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment';
import {events} from '@/graphql/graphql.js';
import later from 'later';
import {every_minute} from '@/resources/schedules';
import CurrentEvent from '@components/events/current.vue';
import NextEvent from '@components/events/next.vue';
import UpcomingEvents from '@components/events/upcoming.vue';

var interval;
    export default {
        props: ['name'],
        components : {
            CurrentEvent,
            NextEvent,
            UpcomingEvents,
        },
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
            have_events() {
                return this.events.length > 0;
            }

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

<template>
<div class="column is-10 is-offset-1 component event-component">
    <div v-if="have_events">
      <div class="tile is-ancestor is-primary">
        <div class="tile is-parent is-7 is-vertical">
          <div class="tile is-child is-primary">
            <current-event :event="currentEvent"></current-event>
          </div>
          <div class="tile is-child">
            <next-event :event="nextEvent"></next-event>
          </div>
        </div>
        <div class="tile is-parent is-vertical is-5">

          <div class="tile is-child">
            <upcoming-events :events="comingUp"></upcoming-events>
          </div>
        </div>
      </div>
    </div>
    <div v-else>
      <div class="tile is-ancestor is-primary">
        <div class="tile is-parent is-7 is-vertical">
          <div class="tile is-child is-primary">
            <div class="notification is-success">
              <h1 class="status available">Available</h1>
            </div>
            <div class="box">
                <h2>No Events Scheduled for the next 24 hours</h2>
            </div>
          </div>
        </div>
      </div>
    </div>
</div>
</template>

<script>
import moment from 'moment';
import {room_events} from '@/graphql/graphql.js';
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
                return moment(date).format('dddd [at] h:mm:a');
            },
            from(date) {
                return moment(date).fromNow(true);
            }
        },
        data() {
            return {
                now: moment(),
                rooms: [],
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
            },
            events() {
              var room = this.rooms.find( (room ) => {
                return room.name === this.name;
              });
              if( room ) {
                return room.events;
              }
              return [];
            }

        },
        methods: {
            updateNow() {
                this.now = moment();
            }
        },
        created() {
            interval = later.setInterval(this.updateNow, every_minute );
        },
        destroyed() {
            interval.clear();
        },
        apollo: {
            rooms: {
                query: room_events,
                pollInterval: 1000 * 60 * 5
            }
        }

    };

</script>

<style lang="scss" scoped>
  .notification {
    margin-top:1rem;
  }
</style>

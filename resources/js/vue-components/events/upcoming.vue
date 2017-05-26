<template>
<div class="component upcoming-events-component">
  <div class="notification">
    <h1>Upcoming Meetings</h1>
  </div>
    <div class="box" v-if="events.length">
        <ul>
            <li v-for="event in events">{{event.startTime | date}} - {{event.name}}</li>
        </ul>
    </div>
    <div class="box" v-else>
        <h2>No upcoming events in the next 24 hours.</h2>
    </div>
</div>
</template>

<script>
import moment from 'moment';
    export default {
        props: ['events'],
        filters: {
            date(date) {
                return moment(date).format('dddd [at] h:mm a');
            }
        }
    };

</script>

<style lang="scss" scoped>
  .notification {
    margin-top:1rem;
  }
</style>

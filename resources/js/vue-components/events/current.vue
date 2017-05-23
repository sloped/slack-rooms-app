<template>
<div class="component current-event-component">
    <div class="current" v-if="event">
        <h1 class="status occupied">Occupied</h1>
        <div class="box">
            <div class="currentEventEnd">Ends in {{event.endTime | from}}</div>
            <div class="columns">
            <div class="eventName column is-two-thirds">{{event.name}}</div>
            <div class="eventOrganizer column is-one-third"><span>Organizer: {{event.creator}}</span></div>
            </div>
            <div class="eventAttendees">Attendees</div>
            <ul>
                <li v-for="attendee in event.attendees">{{attendee}}</li>
            </ul>
        </div>
    </div>
    <div v-else>
        <h1 class="status available">Available</h1>
    </div>
</div>
</template>

<script>

import moment from 'moment';

    export default {
        props: ['event'],
        filters: {
            from(date) {
                return moment(date).fromNow(true);
            }
        }
    };

</script>

<style lang="scss" scoped>
.currentEventEnd {
    font-size:1rem;
    font-weight:700;
    margin-bottom:.5rem;
}
.eventAttendees {
    font-weight:700;
}

</style>

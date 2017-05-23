<template>
<div class="component next-event-component" v-if="event">
    <h1>Next Meeting</h1>
    <div class="box">
        <div class="columns">
            <div class="eventName column is-two-thirds">{{event.name}}</div>
            <div class="eventOrganizer column is-one-third"><span>Organizer: {{event.creator}}</span></div>
        </div>
        <div>
            <div class="eventStart"><strong>Starts:</strong> {{event.startTime | date}} ({{event.startTime | from }})</div>
            <div class="eventEnd"><strong>Ends:</strong> {{event.endTime | date}}</div>
        </div>
    </div>
</div>
</template>

<script>
import moment from 'moment';
    export default {
        props: ['event'],
        filters: {
            date(date) {
                return moment(date).format('dddd [at] h:mm a');
            },
            from(date) {
                return moment(date).fromNow(true);
            }
        },

    };

</script>

<style lang="scss" scoped>

</style>

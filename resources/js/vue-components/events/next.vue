<template>
<div class="component next-event-component" v-if="event">
    <h1>Next Meeting</h1>
    <div class="box">
        <div class="columns">
            <div class="eventName column is-two-thirds">{{event.name}}</div>
            <div class="eventOrganizer column is-one-third"><span>Organizer: {{event.creator}}</span></div>
        </div>
        <div>
            <div class="eventStart"><strong>Starts {{event.startTime | from }}</strong> ({{event.startTime | date}})</div>
            <div class="eventEnd"><strong>{{length}} long</strong> ({{event.endTime | date}})</div>
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
                return moment(date).fromNow();
            }
        },
        computed : {
          length() {
            if( moment(this.event.endTime).diff(this.event.startTime) === 3600000 ) {
              return moment(this.event.endTime).diff(this.event.startTime, 'h') + ' hour';
            }
            else if( moment(this.event.endTime).diff(this.event.startTime) > 3600000 ) {
              return moment(this.event.endTime).diff(this.event.startTime, 'h') + ' hours';
            }
            return moment(this.event.endTime).diff(this.event.startTime, 'm') + ' minutes';
          }
        }

    };

</script>

<style lang="scss" scoped>

</style>

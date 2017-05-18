<template>
<div class="component upcoming-events-component" v-if="events.length">
    <h1>Upcoming</h1>
    <div class="box">
        <ul>
            <li v-for="event in events">{{event.startTime | date}} - {{event.name}}</li>
        </ul>
    </div>
</div>
</template>

<script>
import moment from 'moment';

var interval;
    export default {
        props: ['events'],
        filters: {
            date(date) {
                return moment(date).format('dddd [at] h:mm a')
            }
        }
    };

</script>

<style lang="scss" scoped>

</style>

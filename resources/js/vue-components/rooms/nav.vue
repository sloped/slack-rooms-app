<template>
  <div class="nav-left">
    <router-link v-for="room in rooms" :key="room.name" class="is-tab nav-item" :class="{'is-active': current_route === room.name}" :to="{name: 'events', params: {name: room.name}}">{{room.name}}</router-link>
  </div>
</template>

<script>

import moment from 'moment';

    export default {
        props: ['rooms'],
        filters: {
            from(date) {
                return moment(date).fromNow(true);
            }
        },
        computed: {
          current_route() {
              if( this.$route.name === 'events') {
                return this.$route.params.name;
              }
              else {
                return this.$route.name;
              }
            },
            currentEvent() {
                return this.events.find( (event) => {
                    return this.now.isBetween(moment(event.startTime), moment(event.endTime));
                });
            },
        }
    };

</script>

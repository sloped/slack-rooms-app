<template>
<div class="admin column is-10 is-offset-1">
  <div class="columns">
    <div class="column is-2">
      <aside class="menu">
      <p class="menu-label">Edit</p>
      <ul class="menu-list">
        <li v-for="item in rooms" :key="item.id"><a href="#" v-on:click.prevent="edit_room(item)" :class="{'is-active' : mode === 'edit' && room.id === item.id}">{{item.name}}</a></li>
      </ul>
      <p class="menu-label">Create</p>
      <ul class="menu-list">
        <a class="is-primary" href="#" v-on:click.prevent="create_room" :class="{'is-active' : mode === 'create'}">Create Room</a>
      </ul>

      </aside>
    </div>
    <div class="column">
      <edit-room v-if="mode === 'edit'" :room="room" v-on:update="clear_room"></edit-room>
      <create-room v-if="mode === 'create'" :room="room" v-on:update="clear_room"></create-room>
    </div>
  </div>
</div>
</template>

<script>
import {user, admin_rooms} from '@/graphql/graphql.js';
import editRoom from '@components/admin/edit_room.vue';
import createRoom from '@components/admin/create_room.vue';
    export default {
        data() {
            return {
                user: null,
                rooms: null,
                room: null,
                mode: null,
            };
        },
        components: {
          editRoom,
          createRoom
        },
        methods: {
          edit_room(room) {
            this.room = {
              id: room.id,
              name: room.name,
              calendar : room.calendar
            };
            this.mode = 'edit';
          },
          create_room() {
            this.room = {
              name: null,
              calenar: null
            };
            this.mode = 'create';
          },
          clear_room() {
             this.room = null;
             this.mode = null;
          }
        },
        apollo: {
            rooms : {
              query: admin_rooms,
            },
            user : {
                 query: user,
                 pollInterval: 1000 * 60 * 15
            }
        }

    };

</script>

<style lang="sass">

</style>

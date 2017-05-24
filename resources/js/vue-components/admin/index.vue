<template>
<div class="admin column is-10 is-offset-1">
  <div class="columns">
    <div class="column is-2">
      <aside class="menu">
      <p class="menu-label">Edit Room</p>
      <ul class="menu-list">
        <li v-for="room in rooms"><a href="#" v-on:click.prevent="set_room(room)">{{room.name}}</a></li>
      </ul>
      </aside>
    </div>
    <div class="column" v-if="room">
      <h1>Edit {{room.name}}</h1>
      <div class="field">
        <label class="label">Name</label>
        <p class="control">
          <input class="input" type="text" v-model="room.name" />
        </p>
      </div>
      <div class="field">
        <label class="label">Calendar ID</label>
        <p class="control">
          <input class="input" type="text" v-model="room.calendar" />
        </p>
      </div>
      <button class="button is-primary" v-on:click.prevent="update_room">Update</button>
    </div>
  </div>
</div>
</template>

<script>
import {user, admin_rooms} from '@/graphql/graphql.js';
    export default {
        data() {
            return {
                user: null,
                rooms: null,
                room: null
            };
        },
        methods: {
          set_room(room) {
            this.room = {
              name: room.name,
              calendar : room.calendar
            };
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

<template>
<div class="component create-room-component">
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
    <div class="field">
      <label class="label">Room</label>
      <p class="control">
        <span class="select">
          <select v-model="room.building">
            <option disabled value="">Select a room</option>
            <option value="rayvic">Rayvic</option>
            <option value="annex">Annex</option>
          </select>
        </span>
      </p>
    </div>
    <button class="button is-primary" v-on:click.prevent="create_room">Create</button>
</div>
</template>

<script>
import {create_room} from '@/graphql/graphql.js';
    export default {
        props: ['room'],
        methods: {
          create_room() {
            this.$apollo.mutate( {
              mutation: create_room,
              variables: {
                room: {
                  name: this.room.name,
                  calendar: this.room.calendar,
                  building: this.room.building
                }
              },
              refetchQueries: [
                    'Rooms',
                    'RoomsForAdmin'
              ]
            }).then( (data) => {
                this.$emit('update');
            });

          }
        }

    };

</script>

<style lang="sass">

</style>

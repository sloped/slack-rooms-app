<template>
<div class="component edit-room-component">
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
    <button class="button is-danger" v-on:click.prevent="delete_room">Delete</button>
</div>
</template>

<script>
import {update_room, delete_room} from '@/graphql/graphql.js';
    export default {
        props: ['room'],
        methods: {
          update_room() {
            this.$apollo.mutate( {
              mutation: update_room,
              variables: {
                id: this.room.id,
                room: {
                  name: this.room.name,
                  calendar: this.room.calendar
                }
              }
            }).then( (data) => {
                this.$emit('update');
            });

          },
           delete_room() {
            this.$apollo.mutate( {
              mutation: delete_room,
              variables: {
                id: this.room.id
              },
              refetchQueries: [
                    'Rooms',
                    'RoomsForAdmin'
              ],
            }).then( (data) => {
                this.$emit('update');
            });

          }
        }

    };

</script>

<style lang="sass">

</style>

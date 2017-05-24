<template>
<div class="admin component">


</div>
</template>

<script>

    export default {
        props: ['value'],
        data() {
          return {
            room : null
          };
        },
        methods: {
          updateName(value) {
            this.room.name = value;
            this.$emit('input', this.room);
          },
          updateCalendar(value) {
            this.room.calendar = value;
            this.$emit('input', this.room);
          }
        },
        created() {
          this.room = this.value;
        }

    };

</script>

<style lang="sass">

</style>

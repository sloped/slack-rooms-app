<template>
<div class="app">

    <nav class="nav">
        <div class="nav-left">
          <router-link v-if="user" v-for="room in rooms" :key="room.name" class="is-tab nav-item" :class="{'is-active': current_route === room.name}" :to="{name: 'events', params: {name: room.name}}">{{room.name}}</router-link>
        </div>
        <div class="nav-right">
            <router-link v-if="user" :to="{name: 'about'}" :class="{'is-active': current_route === 'about'}" class="is-tab nav-item">About</router-link>
            <logout-button :user="user"></logout-button>
        </div>
    </nav>
    <div class="columns">
        <router-view></router-view>
    </div>
    <footer class="footer" >
        <div class="container">
            <div class="content has-text-centered">
               <strong>Current Time: {{now}}</strong> |
                <span>This site runs like <a href="http://clockwork.com">Clockwork</a>.</span>
            </div>
        </div>
    </footer>
</div>
</template>

<script>
import apolloProvider from '../apollo/apolloProvider.js';
import router from '../routes/index.js';
import moment from 'moment';
import {rooms} from '../graphql/graphql.js';
import later from 'later';
import {every_minute} from '../resources/schedules';
import logoutButton from '@components/auth/logout_button.vue';
import {user} from '@/graphql/graphql.js';
var interval = null;
    export default {
        apolloProvider,
        router,
        components : {
            logoutButton
        },
        data() {
            return {
                rooms : [],
                user: null,
                currentMoment: moment()
            };
        },
        computed : {
            now() {
                return this.currentMoment.format("h:mm a");
            },
            current_route() {
              if( this.$route.name === 'events') {
                return this.$route.params.name;
              }
              else {
                return this.$route.name;
              }
            }
        },
        methods: {
            updateNow() {
                this.currentMoment = moment();
            }
        },
        created() {
            interval = later.setInterval(this.updateNow, every_minute );
        },
        destroyed() {
            interval.clear();
        },
        apollo: {
            rooms,
            user : {
                 query: user,
                 pollInterval: 1000 * 60 * 15
            }
        }

    };

</script>

<style lang="sass">
    @import "../../sass/main.scss"


</style>

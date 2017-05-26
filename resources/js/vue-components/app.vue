<template>
<div class="app">

    <nav class="nav">
        <room-nav v-if="user" v-bind:rooms="rooms"></room-nav>
        <div class="nav-right">
            <router-link v-if="user" :to="{name: 'about'}" :class="{'is-active': $route.name === 'about'}" class="is-tab nav-item">About</router-link>
            <router-link v-if="is_admin" :to="{name: 'admin'}" :class="{'is-active': $route.name === 'admin'}" class="is-tab nav-item">Admin</router-link>
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
import {room_events} from '../graphql/graphql.js';
import later from 'later';
import {every_minute} from '../resources/schedules';
import logoutButton from '@components/auth/logout_button.vue';
import roomNav from '@components/rooms/nav.vue';
import {user} from '@/graphql/graphql.js';
var interval = null;
    export default {
        apolloProvider,
        router,
        components : {
            logoutButton,
            roomNav
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
            is_admin() {
              if( this.user === null ) {
                return false;
              }
              return this.user.is_admin;
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
            rooms: {
              query: room_events
            },
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

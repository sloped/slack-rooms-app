<template>
<p  class="component static-component column is-8 is-offset-2 has-text-left">
  <vue-markdown>
  # About This Site

  This is the Clockwork calendar application. It uses the Google Calendar Api to determine which rooms are available and retrieve event information from the API.

  You can view each conference rooms current status and the schedule for the next 24 hours. In addition, within the Clockwork Slack Organization, you can issue commands such as `/rooms available` to determine what rooms may be available for your use.

  ## Notes

  - All data may be cached for up to 15 minutes.
  - Available status is determined for the current time. It does not calculate if the room will still be available in one minute or one second.
  - Only people with a clockwork.com email in the Clockwork Google Apps account will be granted access.

  ## Questions

  Ping conner on Slack or by email.
  *If you don't know who conner is, this application is probably ready for retirement.*

  </vue-markdown>
</p>
</template>

<script>
import vueMarkdown from 'vue-markdown';
  export default {
        components: {
          vueMarkdown
        }
    };
</script>

<style lang="scss">
  .static-component {
    text-align:left;
    h1 {
      text-align:left;
    }
    p {
      margin-bottom:.5rem;
    }
    li {
      margin-left:2rem;
    }
  }
</style>

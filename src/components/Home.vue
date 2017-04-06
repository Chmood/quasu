<template>
  <div class="">

    <h2 class="page-title">Quasu Starter App</h2>

    <h3 class="page-subtitle">Unread messages ({{ nMessagesUnread }})</h3>

    <messages
      :compact="true"
      :customVisibility="'unread'"
    ></messages>

  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from 'vuex'
import Messages from './Messages.vue'

export default {
  components: {
    Messages
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'messages'
    ]),
    nMessagesUnread () {
      return this.messages.filter(message => !message.read).length
    }
  },

  methods: {
    ...mapActions([
      // 'fetchMessages'
    ]),
    ...mapMutations([
      // 'TOGGLE_ALL_MESSAGES'
    ])
  }
}
</script>

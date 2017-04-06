<template>
  <section class="section section--messages"
    :class="[compact ? 'messages--compact' : '']"
  >
    <h2 class="page-title">Messages</h2>

    <div class="margin-bottom">
      <button class="tertiary" @click="fetchMessages()"><i>replay</i>Refresh</button>

      <button class="primary" @click="TOGGLE_ALL_MESSAGES({ read: !allChecked })">
        <i>book</i>
        <span v-if="allChecked">Mark all as unread</span>
        <span v-else>Mark all as read</span>
      </button>
    </div>

    <q-search class="messages__search margin-bottom light text-dark"
    :debounce="600"
    placeholder="Rechercher dans les messages"
    icon="search"
    ></q-search>

    <q-tabs class="message-filters light justified margin-bottom"
      :refs="$refs"
      default-tab="tab-4"
    >
      <q-tab :class="{ 'active': visibility === key }"
        v-for="(val, key) in filters"
        :key="key"
        icon=""
      >
        <div class="filter"
        :class="{ 'filter--active': visibility === key }"
        @click="visibility = key"
        >
          {{ key === 'all' ? 'ALL' : '' }}
          {{ key === 'unread' ? 'UNREAD' : '' }}
          {{ key === 'read' ? 'READ' : '' }}
          &nbsp;({{ nMessages[key] }})
        </div>
      </q-tab>
    </q-tabs>

    <div class="messages">
      <message
        v-if="filteredMessages"
        v-for="message in filteredMessages"
        :key="message.id"
        :message="message"
      ></message>
    </div>

  </section>
</template>

<script>
  import { mapGetters, mapMutations, mapActions } from 'vuex'
  import Message from './Message.vue'
  // import { Loading } from 'quasar'

  const filters = {
    all: messages => messages,
    unread: messages => messages.filter(message => !message.read),
    read: messages => messages.filter(message => message.read)
  }

  export default {
    components: { Message },
    data () {
      return {
        visibility: 'all',
        filters: filters
      }
    },
    props: [
      'compact',
      'customVisibility'
    ],
    computed: {
      ...mapGetters([
        'messages'
      ]),
      filteredMessages () {
        return filters[this.visibility](this.messages)
      },
      nMessages () { // Needed for dynamic filter tab counters
        if (this.messages.filter) {
          return {
            all: this.messages.length,
            unread: this.messages.filter(message => !message.read).length,
            read: this.nMessagesTotal - this.nMessagesUnread
          }
        }
        else {
          return { all: 0, unread: 0, read: 0 }
        }
      },
      nMessagesTotal () {
        return this.messages.length
      },
      nMessagesUnread () {
        return this.messages.filter(message => !message.read).length
      },
      nMessagesRead () {
        return this.nMessagesTotal - this.nMessagesUnread
      },
      allChecked () {
        return this.messages.every(message => message.read)
      }
    },

    methods: {
      ...mapActions([
        'fetchMessages'
      ]),
      ...mapMutations([
        'TOGGLE_ALL_MESSAGES'
      ]),
      fetchMessages () {
        // Loading.show({message: 'Some important process is in progress. Hang on...'})
        this.$store.dispatch('fetchMessages')
      }
    },
    filters: {
      pluralize: (n, w) => n === 1 ? w : (w + 's'),
      capitalize: s => s.charAt(0).toUpperCase() + s.slice(1)
    },
    mounted () {
      // Set custom visibility filter
      if (this.customVisibility) {
        this.visibility = this.customVisibility
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import "styles/main";

  .message-filters {}

  .q-tabs {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  /* Fix tab / filter click problems */

  .message-filters .q-tab {
    padding: 0;
  }

  .message-filters .q-tab-label {
    display: flex;
    width: 100%;
  }

  .filter {
    width: 100%;
    padding: $gutter;
    text-align: center;
  }

  /* endfix */

  .filter--active {
    font-weight: bold;
  }

  .margin-bottom {
    margin-bottom: $gutter-double;
  }

  .tab-link {
    color: white;
  }

  .messages {}

  .messages__search {
  }

  /*Compact mode*/

  .messages--compact {}

  .messages--compact > *:not(.messages) {
    display: none;
  }

  .messages--compact .message__actions,
  .messages--compact .message__metas,
  .messages--compact .message__content {
    display: none;
  }


</style>

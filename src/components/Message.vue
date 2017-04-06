<template>
  <article class="message card"
    :class="[
      'message--' + message.type,
      message.read ? 'message--read' : '',
      viewMessageReplyZone ? 'message--reply-expanded' : ''
    ]"
  >

    <div class="message__avatar">
      <img :src="message.authorAvatar" class="">
    </div>

    <div class="message__body">

      <div class="message__metas">
        <div class="message__author">{{ message.author }}</div>
        <div class="message__date">{{ new Date(message.date).toLocaleDateString('en', {weekday: "long", year: "numeric", month: "long", day: "numeric"}) }}</div>
      </div>

      <h3 class="message__title">{{ message.title }}</h3>

      <div class="message__content">
        {{ message.content }}
      </div>

      <div v-if="!viewMessageReplyZone" class="message__actions">
        <button class="text-primary" @click="TOGGLE_MESSAGE({ message: message })">
          <i class="on-left">book</i>
          <span v-if="message.read">Mark as unread</span>
          <span v-else>Mark as read</span>
        </button>
        <button class="text-dark" @click="confirmDelete(message)">
          <i class="on-left">delete</i>
          Delete
        </button>
        <!-- <div class="text-grey-6"></div> -->
        <div class="auto"></div>
        <button class="primary" @click="toggleMessageReplyZone">
          <i class="on-left">reply</i>
          Reply
        </button>
      </div>

      <div class="message__reply">
        <textarea class="margin-bottom block" placeholder="Your response here"></textarea>
        <div class="card-actions">
          <button class="text-dark" @click="toggleMessageReplyZone">
            <i class="on-left">clear</i>
            Cancel
          </button>
          <div class="auto"></div>
          <button class="primary" @click="REPLY_MESSAGE({ message: message })">
            <i class="on-left">reply</i>
            Reply
          </button>
        </div>
      </div>
    </div>

    <div class="message__icon">
      <i>{{ messageIcon(message.type) }}</i>
    </div>

  </article>
</template>

<script>
  import { mapGetters, mapMutations } from 'vuex'
  import { Dialog, Toast } from 'quasar'

  export default {
    data () {
      return {
        viewMessageReplyZone: false
      }
    },
    props: [
      'message'
    ],
    computed: {
      ...mapGetters([
      ])
    },
    methods: {
      ...mapMutations([
        'TOGGLE_MESSAGE',
        'DELETE_MESSAGE'
      ]),
      messageIcon (type) {
        switch (type) {
          case 'important': return 'warning'
          case 'info': return 'info'
          default: return ''
        }
      },
      confirmDelete (message) {
        Dialog.create({
          title: 'Delete this message?',
          message: 'Are you sure? This can\'t be reverted!',
          buttons: [
            {
              label: 'Cancel',
              handler () {
                console.log('Message deletion cancelled')
              }
            },
            {
              label: 'Delete',
              handler: () => {
                Toast.create.positive(`Message has been deleted`)
                this.$store.commit('DELETE_MESSAGE', { message: message })
              }
            }
          ]
        })
      },
      toggleMessageReplyZone () {
        this.viewMessageReplyZone = !this.viewMessageReplyZone
      }
    }
  }
</script>

<style lang="scss" scoped>

  @import "styles/main";

  .message {
    display: flex;
    padding: $gutter;
  }

  .message__avatar {
    padding-right: $gutter;

    > img {
      display: block;
      width: $gutter-triple;
      border-radius: 50%;
    }
  }

  .message__body {
    flex-grow: 1;
  }

  .message__metas {
    margin-bottom: $gutter;
  }

  .message__author {
    // color: #444;
  }
  .message__date {
    font-style: italic;
    color: #888;
  }

  .message__title {
    margin-top: 0;
    font-size: $gutter;
    font-weight: 500;
  }

  .message__content {
    margin-bottom: $gutter;
  }

  .message__actions {
    display: flex;
    margin-left: -$gutter;
  }

  /*MODIFIERS*/

  /*Read Message*/

  .message--read .message__content { display: none; }

  /*Message Reply Zone*/

  .message__reply {
    display: none;

    .message--reply-expanded & {
      display: block;
    }
  }

  .message__reply textarea {
    line-height: 1.5;
  }

</style>

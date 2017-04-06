import axios from 'axios'

const rootURL = 'https://jsonplaceholder.typicode.com'

/**
 * Mocking client-server processing
 */
// const _messages = [
//   {
//     id: 1,
//     date: new Date(),
//     author: 'John Doe',
//     authorAvatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/009ca8ac288a2b9a056df6ba035185e18a8287d5.jpg',
//     title: 'Title of the message #1',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam!',
//     read: false
//   },
//   {
//     id: 2,
//     date: new Date(),
//     author: 'Mary Jane',
//     authorAvatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/009cb35003ceae993714d14ef254d747952318b6.jpg',
//     title: 'Here comes the very long title of the message #2 which should span on multiple lines',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam!',
//     read: false
//   },
//   {
//     id: 5,
//     date: new Date(),
//     author: 'Lilly Pop',
//     authorAvatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/009cdfa72175f6c734f50690b49377b6484358b1.jpg',
//     title: 'Title of the message #3',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam!',
//     read: true
//   },
//   {
//     id: 3,
//     date: new Date(),
//     author: 'Eliz Williams',
//     authorAvatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/009ca8ac288a2b9a056df6ba035185e18a8287d5.jpg',
//     title: 'Title of the message #4',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam!',
//     read: true
//   },
//   {
//     id: 4,
//     date: new Date(),
//     author: 'Una Kravets',
//     authorAvatar: 'https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/00/009cb35003ceae993714d14ef254d747952318b6.jpg',
//     title: 'Here comes the very long title of the message #5 which should span on multiple lines',
//     content: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam!',
//     read: true
//   }
// ]

export default {
  getMessages (cb) {
    // Make a request for a user with a given ID
    axios.get(rootURL + '/comments')
      .then(function (response) {
        // cb(data)
        const data = response.data
        const messages = []

        for (let d of data) {
          if (d.id < 50) {
            const m = {}

            m.id = d.id
            m.date = new Date()
            m.author = d.email
            // m.authorAvatar = d.
            m.title = d.name
            m.content = d.body
            m.read = Math.random() > 0.5

            messages.push(m)
          }
        }

        cb(messages)
      })
      .catch(function (error) {
        console.error(error)
      })

    // setTimeout(() => cb(_messages), 3000)
  },

  postMessage (message, cb, errorCb) {
    setTimeout(() => {
      // simulate random checkout failure.
      (Math.random() > 0.5 || navigator.userAgent.indexOf('PhantomJS') > -1)
        ? cb()
        : errorCb()
    }, 1000)
  }
}

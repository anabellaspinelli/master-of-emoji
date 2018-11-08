const axios = require('axios')

const workspace = process.argv[2]
const token = process.argv[3]

if (!workspace) throw 'Please add your company\'s Slack workspace name as the first argument'
if (!token) throw 'Please add your hacky Slack token as the second argument'

axios({
  method: 'post',
  url: `https://${workspace}.slack.com/api/emoji.adminList`,
  data: `token=${process.argv[3]}`
}).then(res => res.data.emoji)
  .then(data => {
    const users = data.reduce((users, emoji) => {
      if (emoji.user_display_name in users) {
        users[emoji.user_display_name]++
      }
      else {
        users[emoji.user_display_name] = 1
      }
      return users
    }, {})

    const winnerKey = Object.entries(users).reduce((a, b) => a[1] > b[1] ? a : b)[0]

    const emojisOfWinner = data.reduce((acc, emoji) => {
      if (emoji.user_display_name === winnerKey) acc.push(`:${emoji.name}:`)

      return acc
    }, [])

    console.log(`
      Winner: ${winnerKey}
      Emojis created: ${users[winnerKey]}
      And here they are: ${emojisOfWinner.join(' ')}
    `)
  })
  .catch(e => console.log(e))

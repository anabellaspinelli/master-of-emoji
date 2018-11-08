const axios = require('axios')

const workspace = process.argv[2]
const token = process.argv[3]

if (!workspace) throw 'Please add your company\'s Slack workspace name as the first argument'
if (!token) throw 'Please add your hacky Slack token as the second argument (see README)'

axios({
  method: 'post',
  url: `https://${workspace}.slack.com/api/emoji.adminList`,
  data: `token=${process.argv[3]}`
}).then(res => res.data.emoji)
  .then(data => {
    data = data || []

    const leaderboard = data.reduce((leaderboard, emoji) => {
      if (emoji.is_alias) return leaderboard

      if (emoji.user_display_name in leaderboard) {
        leaderboard[emoji.user_display_name]++
      }
      else {
        leaderboard[emoji.user_display_name] = 1
      }
      return leaderboard
    }, {})

    if (Object.keys(leaderboard).length === 0) {
      throw new Error(
        'No custom emoji found. Did you use the correct arguments? (see README for details)'
      )
    }

    const winnerKey = Object.entries(leaderboard).reduce((a, b) => a[1] > b[1] ? a : b)[0]

    const emojisOfWinner = data.reduce((acc, emoji) => {
      if (emoji.user_display_name === winnerKey) acc.push(`:${emoji.name}:`)

      return acc
    }, [])

    console.log(`
      Winner: ${winnerKey}
      Emojis created: ${leaderboard[winnerKey]}
      And here they are: ${emojisOfWinner.join(' ')}
    `)
  })
  .catch(e => console.log(e))

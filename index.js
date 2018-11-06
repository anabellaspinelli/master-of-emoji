const axios = require('axios')

const workspace = process.argv[2] || 'typeform'

axios({
  method: 'post',
  url: `https://${workspace}.slack.com/api/emoji.adminList`,
  data: `token=${process.argv[3]}`
}).then(res => res.data.emoji)
  .then(data => {
    const scoreBoard = data.reduce((acc, curr) => {
      const currentUserName = curr['user_display_name']
      const currentUserScore = acc.find(el => el.name === currentUserName)

      if (!currentUserScore) {
        return [
          ...acc,
          {
            name: currentUserName,
            score: 1
          }
        ]
      }

      currentUserScore.score++
      return acc
    }, [])

    const highScore = scoreBoard
      .reduce((acc, el) => [...acc, el.score], [])
      .sort((a,b) => b - a)[0]
      
    const masterOfEmoji = scoreBoard
      .filter(el => el.score === highScore)
      .reduce((acc, el) => [...acc, el.name], [])
      .join(', ')

    console.log(`
      Winner(s): ${masterOfEmoji}
      Emojis created: ${highScore}
    `)

  })
  .catch(e => console.log(e))

# Master of Emoji

A simple but hacky script to find out who's the crazyest custom emoji creator in you Slack organization.

## Usage
>Disclaimer: this is hacky, I know. Slack doesn't currently provide access to this information via their public API.

1. Clone the project
1. Go to [your Slack custom emoji dashboard](http://my.slack.com/customize/emoji).
1. Open the Network tab in the browser's developer tools
1. Search for an API call with the word "emoji"
1. In its details, scroll down to find the `token` value, under `form-data` section. Copy the token.
1. Back in the terminal, run:
```
$ npm start {slack-workspace-name} {token}
```
7. Congratulate the winner!


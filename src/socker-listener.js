const StreamlabsSocketClient = require('streamlabs-socket-client')
let generate_insult = require("./insult-generator")
let config = require("config")

const rawEvents = [
  'connect',
  'connect_error',
  'connect_timeout',
  'disconnect',
  'error',
  'event',
]

const client = new StreamlabsSocketClient({
  token: config.get("streamlabs_socket_token"),
  emitTests: true // true if you want alerts triggered by the test buttons on the streamlabs dashboard to be emitted. default false.
})

// Hook all different event listeners
let events = [
  ...rawEvents,
  //'follow',
  'subscription',
  'resubscription',
  'bits',
  'host',
  'donation',
  'raids',
].forEach((eventName) => {
  client.on(eventName, (...data) => {
    console.log(eventName, JSON.stringify(data))
  })
})

client.on('follow', (data) => {
  console.log(data)
  console.log(data.name + " is a " + generate_insult())
})

client.connect()
console.log('Listening on socket')

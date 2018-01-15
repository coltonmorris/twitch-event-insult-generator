import React, { Component } from 'react'
import StreamlabsSocketClient from 'streamlabs-socket-client/commonjs-browser'
import secret from "./secret"
import generateInsult from './insult-generator'

const rawEvents = [
  'connect',
  'connect_error',
  'connect_timeout',
  'disconnect',
  'error',
  'event',
]

const client = new StreamlabsSocketClient({
  token: secret,
  emitTests: true // true if you want alerts triggered by the test buttons on the streamlabs dashboard to be emitted. default false.
})

const images = importAll(require.context('../public/assets/flipoff', false, /\.(gif|jpe?g|svg)$/))

function importAll(r) {
  let images = {}
  // eslint-disable-next-line
  r.keys().map((item, index) => {
    images[item.replace('./', '')] = r(item) })
  return images
}


class FollowEvent extends Component {
  constructor(props) {
    super(props)
    this.state = {hideElement: true, name: 'your mom'}
  }

  componentWillMount() {
    // Hook all different event listeners
    [
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

    let that = this
    client.on('follow', (data) => {
      console.log(data)

      // a message is already showing
      if (this.state.hideElement == false){
      }

      this.setState({hideElement:false, name: data.name})
      setTimeout(function() {
        that.setState({hideElement:true})
      }, 7000)
    })

    client.connect()
  }

  getRandomGif() {
    return images[(Math.floor(Math.random()*Object.keys(images).length)+1).toString() + '.gif']
  }

  render() {
    return (
      <div style={{}}>
      {this.state.hideElement ? null:
        <span>
          <img src={this.getRandomGif()} alt="yup" />
          <h1 style={{"background":"white"}}>
            {this.state.name + ' is a ' + generateInsult()}
          </h1>
        </span>
      }
      </div>
    )
  }
}

export default FollowEvent

import React, { Component } from "react"

export default class extends Component {
  componentDidMount() {
    const audioEl = document.getElementsByClassName("audio-element")[0]
    audioEl.play()
  }

  render() {
    return (
      <div>
        <audio className="audio-element">
          <source src="C:\Users\chanc\tetris-react\src\music\music.mp3"></source>
        </audio>
      </div>
    )
  }
}
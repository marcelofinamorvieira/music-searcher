import React, { Component } from "react";

class Songs extends Component {
    constructor(props) {
        super(props);
        this.state = {
            playing: false,
            audio: null,
            playingURL: ""
        }
    };
    playAudio(previewURL) {
        let audio = new Audio(previewURL);
        if (!this.state.playing) {
            audio.play();
            this.setState({playing: true, playingURL: previewURL, audio});
        } else {
            if (this.state.playingURL === previewURL) {
                this.state.audio.pause();
                this.setState({playing: false, playingURL: ""});
            } else {
                this.state.audio.pause();
                audio.play();
                this.setState({playing: true, playingURL: previewURL, audio})
            }
        }
    }
    render() {
        let tracks = this.props.tracks;
        return (
            <div className="Library">
                {
                    tracks.map((track, key) => {
                        return (
                            <div key={key} className="Track" onClick={() => this.playAudio(track.previewUrl)}>
                                <img alt="album cover" src={track.artworkUrl100} />
                                <h5>{track.trackName}</h5>
                                <h6>{track.collectionName}</h6>
                                <div className="track-play"><div className="track-play-inner">{this.state.playingURL === track.previewUrl ? <span>| |</span> : <span>&#9654;</span>}</div></div>
                            </div>
                        )
                    })
                }
            </div>
        );
    };
}

export default Songs;
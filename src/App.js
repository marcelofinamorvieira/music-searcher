import logo from './logo.svg';
import './App.css';
import Songs from "./Songs.js";
import React, { Component } from "react";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            query: "",
            artist: null,
            genre: null,
            tracks: []
        }
    }
    search() {
        const BASE_URL = "https://itunes.apple.com/search?";
        let FETCH_URL = `${BASE_URL}term=${this.state.query.split(" ").join("+")}&media=music&limit=10`;
        fetch(FETCH_URL, {
            method: "GET"
        })
            .then(response => response.json())
            .then(json => {
                if (json.results[0] !== undefined) {
                    this.setState({ artist: json.results[0].artistName });
                    this.setState({genre: json.results[0].primaryGenreName});
                    this.setState({tracks: json.results});
                } else {
                    this.setState({ artist: "No artist with that name was found" })
                }
            })
    }
    render() {
        return (
            <div className="App">
                <h1>Music Overviewer</h1>
                <form>
                    <input
                        className="form-control" type="text"
                        placeholder="Type in the artist or band you want to search"
                        value={this.state.query}
                        onChange={event => this.setState({ query: event.target.value })}
                        onKeyPress={event => {
                            if (event.key === "Enter") {
                                event.preventDefault();
                                this.search();
                            }
                        }} />
                    <button onClick={() => this.search()} type="button" className="btn btn-primary">Search</button>
                </form>
                <h2>{this.state.artist}</h2>
                <div className="Genre">{this.state.genre}</div>
                <Songs tracks={this.state.tracks}/>
            </div>
        );
    };
};

export default App;
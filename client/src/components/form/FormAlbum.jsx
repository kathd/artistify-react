import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// custom tools
// import CustomInputFile from "./../icon/IconAvatarAdmin";
import LabPreview from "../LabPreview";
// styles
import "./../../styles/form.css";
import "./../../styles/icon-avatar.css";
import APIHandler from "../../api/APIHandler";

class FormAlbum extends Component {

  state = {
    album: {}
  }

  componentDidMount() {
    APIHandler
    .get("/artists")
    .then(resArtists => {
      APIHandler
      .get("/labels")
      .then(resLabels => {
        this.setState({
          labels: resLabels.data.labels,
          artists: resArtists.data.artists 
        })
      })
      .catch(err => console.error(err))
    })
    .catch(err => console.error(err))
  }

  handleChange = e => {
    this.setState({ album: { ...this.state.album, [e.target.name]: e.target.value} })
  };

  handleSubmit = e => {
    e.preventDefault();
    const album = this.state.album
    // const fd = new FormData();
    // fd.append("title", this.state.title)
    // fd.append("releaseDate", this.state.releaseDate)
    // fd.append("artist", this.state.artist)
    // fd.append("cover", this.state.cover)
    // fd.append("description", this.state.description)
    // fd.append("label", this.state.label)
    // console.log(album)
    APIHandler
    .post("/albums", album)
    .then(apiRes => {
      console.log(apiRes);
      this.props.history.push("/albums/create")
    })
    .catch(err => console.error(err))

  };



  render() {
    return (
      <>
        <h1 className="title diy">D.I.Y (FormAlbum)</h1>
        
        <form
          className="form"
          onSubmit={this.handleSubmit}
          onChange={this.handleChange}>

          <label
            className="label"
            htmlFor="title">
            title
          </label>
          <input
            className="input"
            id="title"
            type="text"
            name="title"
            // defaultValue={this.state.title}
          />

          <label
            className="label"
            htmlFor="releaseDate">
            release date
          </label>
          <input
            className="input"
            id="releaseDate"
            name="releaseDate"
            type="date"
            // defaultValue={this.state.releaseDate}
          />

          <label
            className="label"
            htmlFor="artist">
            artist
          </label>
          <select name="artist" defaultValue="Select Artist">
            <option disabled>Select Artist</option>
            {this.state.artists && this.state.artists.map((artist,i) => (
              <option key={i} value={artist._id}>
                {artist.name}
              </option>
            ))}
          </select>

          {/* <label
            className="label"
            htmlFor="cover">
            cover
          </label>
          <input
            className="input"
            id="cover"
            name="cover"
            type="text"
            // defaultValue={this.state.cover}
          /> */}

          <label
            className="label"
            htmlFor="description">
            description
          </label>
          <input
            className="input"
            id="description"
            type="text"
            name="description"
            // defaultValue={this.state.description}
          />

          <label
            className="label" 
            htmlFor="label">
            label
          </label>
          <select name="label" defaultValue="Select Label">
          <option disabled>Select Label</option>
            {this.state.labels && this.state.labels.map((label,i) => (
              <option key={i} value={label._id}>
                {label.name}
              </option>
            ))}
          </select>

          <button className="btn">ok</button>
        </form>


        <LabPreview name="albumForm" isSmall />
      </>
    );
  }
}

export default withRouter(FormAlbum);

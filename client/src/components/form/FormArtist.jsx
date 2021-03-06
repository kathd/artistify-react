import React, { Component } from "react";
import { withRouter } from "react-router-dom";
// custom tools
import LabPreview from "../LabPreview";
import APIHandler from "./../../api/APIHandler";
// styles
// styles
import "./../../styles/form.css";
// const apiHandler  = new ApiHandler();

class FormArtist extends Component {
  state = {
    _id: "",
    name: "",
    // styles n'est pas envoyé dans le backend
    styles: [], 
    style: "",
    description: "",
    isBand: ""
  };

  componentDidMount() {
    if (this.props._id ) {
      APIHandler.get(`/artists/${this.props._id}`)
        .then(apiRes => {
          this.setState(apiRes.data);
          console.log("this is the edit result", apiRes.data);
        })
        .catch(apiErr => console.error(apiErr));
      }
    
    APIHandler.get("/styles")
      .then(apiRes => {
        this.setState({ styles: apiRes.data.styles });
        console.log("this result", apiRes);
      })
      .catch(apiErr => console.error(apiErr));
  }


  handleChange = e => {
    this.setState({ [e.target.name]: e.target.value })
  };


  handleSubmit = e => {
    e.preventDefault();
    if (this.props._id) {
      APIHandler.patch(`/artists/${this.props._id}`, this.state)
      .then(apiRes => {
        console.log("artist was inserted", apiRes);
        this.props.history.push("/admin/artists")
      })
      .catch(apiErr => console.error(apiErr));
  }
    else {
    APIHandler.post("/artists", this.state)
      .then(apiRes => {
        console.log("artist was inserted", apiRes);
        this.props.history.push("/admin/artists")
      })
      .catch(apiErr => console.error(apiErr));
    }
  };

  render() {
    console.log(this.state);
    return (
      <>
        <h1 className="title diy">D.I.Y (FormArtist)</h1>
        <p>Code a form to Create/Update artists.</p>
        <hr />
        <form className="form" onSubmit={this.handleSubmit}>
          <label className="label" htmlFor="name">
            Name
          </label>
          <input
            className="input"
            name="name"
            id="name"
            type="text"
            onChange={this.handleChange}
            value={this.state.name}
          />

          <label className="label" htmlFor="description">
            Description
          </label>
          <input
            className="input"
            name="description"
            id="description"
            type="textarea"
            onChange={this.handleChange}
            defaultValue={this.state.description}
          />

          <label className="label" htmlFor="style">
            Style
          </label>
          <select
            className="select"
            id="style"
            name="style"
            value = {this.state.style}
            onChange={this.handleChange}
          >
            <option disabled>Select Style</option>
            {this.state.styles.map((style, i) => (
              <option
                value={style._id} key={i}>
                {style.name}
              </option>
            ))}
          </select>
          {/* <option value="Techno" type="text">Techno</option>
          <option value="Techno" type="text">Electro</option>
          <option value="Techno" type="text">Jazz</option> */}

          <p>Is Band?</p>
          <div>
            <label className="label" htmlFor="isBand" name="isBand">
              yes
            </label>
            <input
              className="input"
              name="isBand"
              value="true"
              onChange={this.handleChange}
              id="isBand"
              type="radio"
              checked={this.state.isBand}
            />

            <label className="label" htmlFor="isBand" name="isBand">
              no
            </label>
            <input
              className="input"
              name="isBand"
              value="false"
              onChange={this.handleChange}
              id="isBand"
              type="radio"
              checked = {this.state.isBand}
            />
          </div>

          <button type="submit" className="btn">
            ok
          </button>
        </form>
        <LabPreview name="artistForm" isSmall />
      </>
    );
  }
}
export default withRouter(FormArtist);
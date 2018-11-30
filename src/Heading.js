import React, { Component } from "react";
import "./Styles.css";


class Heading extends Component {
  state = {
    open: false
  }
  
  styles = {
    menuButton: {
      marginLeft: 10,
      position: "absolute",
      left: 10,
      top: 20,
      padding: 10,
      borderRadius: 5
    },
    hide: {
      display: 'none'
    },
    header: {
      marginTop: "0px"
    }
  };

//Dan Brown
toggleMenu = () => {
    this.setState({
      open: !this.state.open
    });
  console.log("open");
  }

  render = () => {
    return (
       <div className="title">
      <button onClick={this.toggleMenu} style={this.styles.menuButton}>
            <i className="fa fa-bars">X</i>
          </button>
            <h1>Dallas Malls</h1>
       </div>
    )
  }
}

export default Heading;

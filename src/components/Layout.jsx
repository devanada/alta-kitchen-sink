import React, { Component } from "react";
import CustomHeader from "./Header";

class Layout extends Component {
  render() {
    return (
      <div className="w-full h-screen flex flex-col overflow-auto">
        <CustomHeader title={this.props.title} />
        <div className="h-full w-full">{this.props.children}</div>
      </div>
    );
  }
}

export default Layout;

/*
- export default: 
  fungsinya digunakan untuk export satu komponen saja
  untuk import-nya dia langsung seperti ini
  import Layout from "./Layout"
- export / export {}:
  fungsinya biasa digunakan untuk export beberapa komponen sekaligus
  untuk import-nya dia seperti ini
  import { CustomHeader } from "./Header"
*/

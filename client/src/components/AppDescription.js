import React, { Component } from "react";
import { Jumbotron, Container, Row, Col } from "reactstrap";
import { withStyles } from "@material-ui/core/styles";

import { observer, inject } from "mobx-react";
import axios from "axios";

let imgUrl = "./../pic3.jpg";
const styles = theme => ({
  description: {
    justifyContent: "center",
    paddingTop: 20,
    paddingBottom: 20,
    marginTop: 30,
    marginBottom: 15,
    marginLeft: 260,
    marginRight: 260,
    backgroundColor: "#bdbdbd",
    opacity: 0.8
  },
  bogImage: {
    backgroundImage: "url(" + imgUrl + ")",
    backgroundRepeat: "round"
  }
});

@inject("store")
@observer
class AppDescription extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.bogImage}>
        <br />
        <br />
        <div className={classes.description}>
          <Container>
            <i>
              <Row>
                <Col sm="12" md={{ size: 6, offset: 3 }}>
                  <h1>Be Our Guest!</h1>
                  <h2>
                    The ultimate app to create and manage your event:
                  </h2>{" "}
                  <h5>
                    <ul className="intro-list">
                      <li>create a guest list</li>
                      <li>crate and send invitations</li>
                      <li>track RSVPs</li>
                      <li>arrange guest seating</li>
                    </ul>
                  </h5>
                  <h3>and much, much more...</h3>{" "}
                </Col>
              </Row>
              <h2>Sign in to create new event!</h2>
            </i>
          </Container>
        </div>
        <br />
        <br />
        <br />
        <br />
      </div>
    );
  }
}

// export default AppDescription;
export default withStyles(styles)(AppDescription);

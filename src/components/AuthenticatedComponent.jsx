import React from "react";

class AuthenticatedComponent extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user: undefined
    };
  }

  render() {
    return <div>Hello World Auth</div>;
  }
}
export default AuthenticatedComponent;

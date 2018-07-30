import React, { Component } from 'react';
import { Redirect,  withRouter } from "react-router-dom";

  const fakeAuth = {
    isAuthenticated: false,
    authenticate(cb) {
      this.isAuthenticated = true;
      setTimeout(cb, 100); // fake async
    },
    signout(cb) {
      this.isAuthenticated = false;
      setTimeout(cb, 100);
    }
  };

  const AuthButton = withRouter(
    ({ history }) =>
      fakeAuth.isAuthenticated ? (
        <p>
          Welcome!{" "}
          <button
            onClick={() => {
              fakeAuth.signout(() => history.push("/"));
            }}
          >
            Sign out
          </button>
        </p>
      ) : (
        <p>You are not logged in.</p>
      )
  );
class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            redirectToReferrer: false
        };
        this.onLogin = this.onLogin.bind(this);
    }

    onLogin()  {
        fakeAuth.authenticate(() => {
            
            this.setState({ redirectToReferrer: true });
            this.props.onLogin(this.state.redirectToReferrer);
        });
    };

    render() {
        const { from } =  { from: { pathname: "/" } };//this.props.location.state ||
        const { redirectToReferrer } = this.state;

        if (redirectToReferrer) {
            return <Redirect to={from} />;
        }

        return (
            <div>
                <AuthButton />
                <button onClick={this.onLogin}>Log in</button>
            </div>
        );
    }
}
export default Login;

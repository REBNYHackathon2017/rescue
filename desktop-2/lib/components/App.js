import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withRouter } from 'react-router';

import * as actions from 'actions/exampleActions';
import Header from 'components/Header';
import Main from 'components/Main';


class App extends React.Component {

  makeItHappen = () => {
    this.props.actions.loadHappening('Happening...');
  }

  render() {
    return (
      <div>
        <Header />
        <Main />
        <div>{this.props.happening}</div>
        <button onClick={this.makeItHappen}>Make It Happen</button>
      </div>
    );
  }
}

function mapStateToProps(state) {  // second parameter is the props actually passed to this component by its parent(s)
  return {
    happening: state.example.happening
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));


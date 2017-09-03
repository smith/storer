import React, { Component } from 'react'
import withStore from './withStore';

class Console extends Component {
  render() {
    return (
      <div>
        <h4>Application State</h4>
        <pre>{JSON.stringify(this.props.storeState, null, '\t')}</pre>
      </div>
    );
  }
}

export default withStore(Console);

import React, { Component } from 'react';
import withStore from './withStore';

class Counter extends Component {
  constructor() {
    super();
    this.onClick = this.onClick.bind(this);
  }

  onClick(event) {
    event.preventDefault();
    this.props.store.set(prevState => ({ counter: prevState.counter + 1 }));
  }

  shouldComponentUpdate(nextProps) {
    return this.props.storeState.counter !== nextProps.storeState.counter;
  }

  render() {
    return (
      <div>
        <h4>Counter</h4>
        Counter: {this.props.storeState.counter}
        <button onClick={this.onClick}>+</button>
      </div>
    );
  }
}

export default withStore(Counter, ['innerb', 'innerc']);

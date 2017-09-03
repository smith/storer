import React, { Component } from 'react'
import withStore from './withStore';

class Form extends Component {
  constructor(props) {
    super();
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onClickOther = this.onClickOther.bind(this);
  }

  onChange() {
    this.props.store.set(() => ({ name: this.input.value }));
  }

  onClick(event) {
    event.preventDefault();
    this.props.store.setAtRoot(prevState => {
      return { innerb: { innerc: { counter: prevState.innerb.innerc.counter + 1 }}};
    });
  }

  onClickOther(event) {
    event.preventDefault();
    this.props.store.setIn(['innerb', 'innerc'], prevState => {
      return { counter: prevState.counter + 1 };
    });
  }

  shouldComponentUpdate(nextProps) {
    return this.props.storeState.name !== nextProps.storeState.name;
  }

  render() {
    return (
      <form>
        <h4>Form</h4>
        <input
          defaultValue={this.props.storeState.name}
          onChange={this.onChange}
          placeholder='Your name here'
          ref={(input) => this.input = input} />
        <br />
        Increment the counter here (with setAtRoot): <button onClick={this.onClick}>+</button>
        Or here (with setIn): <button onClick={this.onClickOther}>+</button>
      </form>
    );
  }
}

export default withStore(Form, ['innera']);

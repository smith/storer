import React, { Component } from 'react';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/map';

// Just a regular component, but uses an Observable for state, to show what a
// regular observable looks like.
export default class MousePosition extends Component {
  constructor() {
    super();
    this.state = { pos: '(0,0)' };
  }

  componentDidMount() {
    Observable.fromEvent(window, 'mousemove')
      .map(event => `(${event.clientX},${event.clientY})`)
      .subscribe(pos => this.setState(() => ({ pos })));
  }

  render() {
    return (
      <div>
        <h4>Mouse Position</h4>
        <span>{this.state.pos}</span>
      </div>
    );
  }
}

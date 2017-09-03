import React, { Component } from 'react';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import 'rxjs/add/operator/pluck';
import initialState from './initialState';

// getIn finds a key in a deep object structure.
// getIn({}, ['a', 'b', 'c']) will get {}.a.b.c
function getIn(object = {}, path = [], create = false) {
  return path.reduce((o, v) => o[v] || o, object);
}

// objectFromPath creates a new object given a value and a path.
// objectFromPath({ d: 1 }, ['a', 'b', 'c']) will return
// { a: { b: { c: { d: 1 }}}}
function objectFromPath(value = {}, path = []) {
  let newObject = {};
  path.reduce((o, v, i) => o[v] = i === path.length - 1 ? value : {}, newObject);
  return newObject;
}

const appStore = new BehaviorSubject(initialState);

export default function withStore(WrappedComponent, keyPath = []) {
  return class StoreComponent extends Component {
    constructor() {
      super();

      this.keyPath = keyPath;
      this.appState = appStore.value;
      this.state = this.appState;
      this.store = appStore;

      if (keyPath.length > 0) {
        this.store = this.store.pluck(...keyPath);
        this.state = getIn(this.state, keyPath);
      }

      // Use this for props to the wrapped component
      this.storeProps = {
        set: this.set.bind(this),
        setIn: this.setIn.bind(this),
        setAtRoot: this.setAtRoot.bind(this),
      };
    }

    componentDidMount() {
      const setState = this.setState.bind(this);
      const appStoreSubscription = appStore.subscribe(newState => this.appState = newState);
      this.subscription = this.store.subscribe(newState => setState(newState));
      this.subscription.add(appStoreSubscription);
    }

    componentWillUnmount() {
      this.subscription.unsubscribe();
    }

    // Set the state in this component and in the store
    setAtRoot = callback => {
      appStore.next(Object.assign(
        this.appState,
        callback(Object.assign({}, this.appState))
      ));
    }

    // Set the state at the current keyPath
    set = callback => this.setIn(this.keyPath, callback);

    // Set the state at a given keypath
    setIn = (keyPath, callback) => {
      const newStatePart = callback(Object.assign({}, getIn(this.appState, keyPath)));
      appStore.next(Object.assign(this.appState, objectFromPath(newStatePart, keyPath)));
    }

    render() {
      return <WrappedComponent
        store={this.storeProps}
        storeState={this.state}
        {...this.props} />;
    }
  };
}

import React, { Component } from 'react'

export default class SlotReel extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: this.props.value
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({ value: nextProps.value })
  }

  render() {
    let icon = null

    switch(this.state.value) {
      case 'apple':
        icon = require('./images/reel/apple.png')
        break
      case 'banana':
        icon = require('./images/reel/banana.png')
        break
      case 'cherry':
        icon = require('./images/reel/cherry.png')
        break
      case 'lemon':
        icon = require('./images/reel/lemon.png')
        break
      default:
        icon = require('./images/reel/cherry.png')
    }

    return (
      <div className="card text-center py-3 px-3">
        <img src={icon} className="img-fluid" alt="reel" />
      </div>
    );
  }
}

import React, { Component } from 'react'
import Reel from './SlotReel'

export default class Slot extends Component {
  constructor(props) {
    super(props);

    this.state = {
      walletId: localStorage.getItem('slot-wallet'),
      balance: 0,
      prize: null,
      round: []
    };

    this.updateBalance = this.updateBalance.bind(this)
    this.spin = this.spin.bind(this)
  }

  spin() {
    if (!this.state.walletId) return false
    fetch(`http://localhost:5000/api/slot/spin?wallet=${this.state.walletId}`)
      .then(res => res.json())
      .then(data => this.setState(data))
      .catch(err => {
        console.error(err)
        if (err.error) window.alert(err.error)
      })
  }

  updateBalance() {
    if (!this.state.walletId) return false
    fetch(`http://localhost:5000/api/slot/balance?wallet=${this.state.walletId}`)
      .then(res => res.json())
      .then(balance => this.setState({ balance }))
      .catch(err => {
        console.error(err)
        this.setState({
          walletId: {
            error: 'Error while creating your account. Try again later.'
          }
        })
      })
  }

  componentDidMount() {
    // "Authenticate" a wallet to get credits to play
    if (!this.state.walletId) {
      fetch(`http://localhost:5000/api/slot/start`)
        .then(res => res.json())
        .then(data => {
          this.setState({ walletId: data.sessionId })
          localStorage.setItem('slot-wallet', data.sessionId)
          this.updateBalance()
        })
        .catch(err => {
          console.error(err)
          this.setState({
            walletId: {
              error: 'Error while creating your account. Try again later.'
            }
          })
        })
    } else {
      this.updateBalance()
    }
  }

  render() {
    return (
      <div>
        <h1>Slot Machine</h1>
        <div className="row my-3">
          <div className="col-md-4">
            <ul className="list-group">
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Your balance
                <span className="badge badge-primary badge-pill">€ {this.state.balance.toFixed(2)}</span>
              </li>
              {this.state.prize?
              <li className="list-group-item d-flex justify-content-between align-items-center list-group-item-success">
                You won!!
                <span className="badge badge-primary badge-pill">€ {this.state.prize.toFixed(2)}</span>
              </li>
              :''}
            </ul>
          </div>
          <div className="col-md-8">
            <div className="row mb-3">
              <div className="col-4">
                <Reel value={this.state.round.length>0 ? this.state.round[0]:null} />
              </div>
              <div className="col-4">
                <Reel value={this.state.round.length>1 ? this.state.round[1]:null} />
              </div>
              <div className="col-4">
                <Reel value={this.state.round.length>2 ? this.state.round[2]:null} />
              </div>
            </div>
            <div className="row">
              <div className="col text-center">
                <button onClick={this.spin} type="button" className="btn btn-large btn-primary">
                  Spin!
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

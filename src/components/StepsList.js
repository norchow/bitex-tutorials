import React, { Component, Fragment } from 'react'
import { connect } from 'react-redux'
import Step from './Step'

class StepsList extends Component {
  render() {
    return (
      <Fragment>
        <Step
          step={this.props.steps['create_sender']}
          condition={this.props.sender === 'intermediary' && !this.props.prefunded}
        />
        <Step
          step={this.props.steps['create_receiver']}
          condition={this.props.receiver === 'third_party'}
        />
        <Step
          step={this.props.steps['create_profile']}
          condition={(this.props.sender === 'intermediary' && !this.props.prefunded) || this.props.receiver === 'third_party'}
        />
        <Step
          step={this.props.steps['buy_btc']}
          condition={true}
        />
        <Step
          step={this.props.steps['transfer_btc']}
          condition={this.props.receiver === 'third_party'}
        />
        <Step
          step={this.props.steps['sell_btc']}
          condition={true}
        />
        <Step
          step={this.props.steps['create_withdrawal_instructions']}
          condition={true}
        />
        <Step
          step={this.props.steps['request_withdrawal']}
          condition={true}
        />
        <Step
          step={this.props.steps['check_withdrawal_status']}
          condition={true}
        />
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  bid: state.bid,
  ask: state.ask,
  origin: state.origin,
  destination: state.destination,
  amount_edited: state.amount_edited,
  value: state.value,
  steps: state.steps,
  prefunded: state.prefunded === 'yes',
  receiver: state.receiver,
  sender: state.sender
})

export default connect(mapStateToProps)(StepsList)

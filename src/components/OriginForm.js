import React, { Component, Fragment } from 'react'
import { FormGroup, Input, InputGroup, InputGroupAddon, Label, Alert } from 'reactstrap'
import ReactFlagsSelect from 'react-flags-select'
import { connect } from 'react-redux'
import { fetchBidPrice, changeSender } from '../store/actions'

class OriginForm extends Component {
  onSenderChange = (e) => {
    this.props.handleSenderChange(e.currentTarget.value)
  }

  onCountryChange = (value) => {
    this.props.handleCountryChange(value)
  }

  render() {
    return (
      <Fragment>
        <FormGroup tag="fieldset">
          <legend>Quién realiza la transferencia?</legend>
          <FormGroup check>
            <Label check>
              <Input type="radio"
                name="sender"
                value="person"
                checked={!this.props.intermediary}
                onChange={this.onSenderChange} 
              />{' '}
              Usuario a cuenta propia
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio"
                name="sender"
                value="intermediary"
                checked={this.props.intermediary}
                onChange={this.onSenderChange}
              />{' '}
              Intermediario
            </Label>
          </FormGroup>
        </FormGroup>
        {
          (this.props.intermediary) ?
            <FormGroup tag="fieldset">
              <legend>La institución dispone de capital de trabajo en Bitex?</legend>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="work_capital" />{' '}
                  Sí
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio" name="work_capital" />{' '}
                  No
                </Label>
              </FormGroup>
            </FormGroup>
            : null
        }
        <FormGroup tag="fieldset">
          <legend>Desde dónde quiere hacer la transferencia?</legend>
          <ReactFlagsSelect
            countries={["AR", "CL", "UY", "PY"]}
            placeholder="Elija país de Origen"
            className="bg-light p-2 rounded"
            onSelect={this.onCountryChange}
          />
          {
            (this.props.bid) ?
              <Alert className="p-1 mt-2 mb-0" color="danger">
                Mejor Bid: {this.props.bid} {this.props.origin.currency}
              </Alert>
              : null
          }
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend>Monto a transferir</legend>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              {this.props.origin.currency.toUpperCase()}
            </InputGroupAddon>
            <Input type="number" name="amount_to_send" onKeyUp={this.onAmountChange}/>
          </InputGroup>
        </FormGroup>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  intermediary: state.sender === 'intermediary',
  bid: state.bid,
  origin: state.origin
})
const mapDispatchToProps = dispatch => ({
  handleCountryChange(country){
    dispatch(fetchBidPrice(country))
  },
  handleSenderChange(sender){
    dispatch(changeSender(sender))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OriginForm)

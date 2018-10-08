import React, { Component, Fragment } from 'react'
import { FormGroup, Input, InputGroup, InputGroupAddon, Label, Alert } from 'reactstrap'
import ReactFlagsSelect from 'react-flags-select'
import { connect } from 'react-redux'
import { fetchAskPrice, changeSender, changeOriginAmount, changePrefunded } from '../store/actions'

class OriginForm extends Component {
  onSenderChange = (e) => {
    this.props.handleSenderChange(e.currentTarget.value)
  }
  onPrefundedChange = (e) => {
    this.props.handlePrefundedChange(e.currentTarget.value)
  }
  onCountryChange = (value) => {
    this.props.handleCountryChange(value)
  }
  onAmountChange = (e) => {
    this.props.handleAmountChange(e.currentTarget.value)
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
                  <Input type="radio"
                    name="prefunded"
                    value="yes"
                    checked={this.props.prefunded}
                    onChange={this.onPrefundedChange}
                  />{' '}
                  Sí
                </Label>
              </FormGroup>
              <FormGroup check>
                <Label check>
                  <Input type="radio"
                    name="prefunded"
                    value="no"
                    checked={!this.props.prefunded}
                    onChange={this.onPrefundedChange}
                  />{' '}
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
            (this.props.ask) ?
              <Alert className="p-1 mt-2 mb-0" color="danger">
                Mejor Ask: {this.props.ask} {this.props.origin.currency}
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
            <Input type="number"
              name="amount_to_send"
              onKeyUp={this.onAmountChange}
              disabled={this.props.amount_edited === 'destination'}
            />
          </InputGroup>
        </FormGroup>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  intermediary: state.sender === 'intermediary',
  ask: state.ask,
  origin: state.origin,
  amount_edited: state.amount_edited,
  prefunded: state.prefunded === 'yes'
})
const mapDispatchToProps = dispatch => ({
  handleCountryChange(country){
    dispatch(fetchAskPrice(country))
  },
  handleSenderChange(sender){
    dispatch(changeSender(sender))
  },
  handleAmountChange(value){
    dispatch(changeOriginAmount(value))
  },
  handlePrefundedChange(value){
    dispatch(changePrefunded(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(OriginForm)

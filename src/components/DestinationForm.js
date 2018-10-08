import React, { Component, Fragment } from 'react'
import { FormGroup, Input, InputGroup, InputGroupAddon, Label, Alert } from 'reactstrap'
import ReactFlagsSelect from 'react-flags-select'
import { connect } from 'react-redux'
import { fetchBidPrice, changeDestinationAmount } from '../store/actions'

class DestinationForm extends Component {
  onChangeCountry = (value) => {
    this.props.handleCountryChange(value)
  }
  onAmountChange = (e) => {
    this.props.handleAmountChange(e.currentTarget.value)
  }

  render() {
    return (
      <Fragment>
        <FormGroup tag="fieldset">
          <legend>A quién le es destinada la transferencia?</legend>
          <FormGroup check>
            <Label check>
              <Input type="radio"
                name="receiver"
                value="self"
              />{' '}
              A una cuenta propia (mismo usuario que envía)
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio"
                name="receiver"
                value="third_party"
              />{' '}
              A un tercero.
            </Label>
          </FormGroup>
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend>Hacia dónde quiere hacer la transferencia?</legend>
          <ReactFlagsSelect
            countries={["AR", "CL", "UY", "PY"]}
            placeholder="Elija país de Destino"
            className="bg-light p-2 rounded"
            onSelect={this.onChangeCountry}
          />
          {
            (this.props.bid) ?
              <Alert className="p-1 mt-2 mb-0" color="danger">
                Mejor Bid: {this.props.bid} {this.props.destination.currency}
              </Alert>
              : null
          }
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend>Monto a recibir</legend>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
            {this.props.destination.currency.toUpperCase()}
            </InputGroupAddon>
            <Input type="number"
              name="amount_to_receive"
              onKeyUp={this.onAmountChange}
              disabled={this.props.amount_edited === 'origin'}
            />
          </InputGroup>
        </FormGroup>
      </Fragment>
    )
  }
}

const mapStateToProps = state => ({
  bid: state.bid,
  destination: state.destination,
  amount_edited: state.amount_edited
})
const mapDispatchToProps = dispatch => ({
  handleCountryChange(country){
    dispatch(fetchBidPrice(country))
  },
  handleAmountChange(value){
    dispatch(changeDestinationAmount(value))
  }
})

export default connect(mapStateToProps, mapDispatchToProps)(DestinationForm)

import React, { Component, Fragment } from 'react'
import { FormGroup, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap'
import ReactFlagsSelect from 'react-flags-select'

class DestinationForm extends Component {
  state = {}
  
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
          />
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend>Monto a recibir</legend>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              {this.state.currency || 'ARS'}
            </InputGroupAddon>
            <Input type="number" name="amount_to_receive" />
          </InputGroup>
        </FormGroup>
      </Fragment>
    )
  }
}

export default DestinationForm

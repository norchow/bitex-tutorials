import React, { Component, Fragment } from 'react'
import { FormGroup, Input, InputGroup, InputGroupAddon, Label } from 'reactstrap'
import ReactFlagsSelect from 'react-flags-select'

class OriginForm extends Component {
  state = {
    intermediary: false
  }

  onIntermediaryChange = (e) => {
    this.setState({intermediary: e.currentTarget.value === 'intermediary'})
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
                checked={!this.state.intermediary}
                onChange={this.onIntermediaryChange} 
              />{' '}
              Usuario a cuenta propia
            </Label>
          </FormGroup>
          <FormGroup check>
            <Label check>
              <Input type="radio"
                name="sender"
                value="intermediary"
                checked={this.state.intermediary}
                onChange={this.onIntermediaryChange}
              />{' '}
              Intermediario
            </Label>
          </FormGroup>
        </FormGroup>
        {
          (this.state.intermediary) ?
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
          />
        </FormGroup>
        <FormGroup tag="fieldset">
          <legend>Monto a transferir</legend>
          <InputGroup>
            <InputGroupAddon addonType="prepend">
              {this.state.currency || 'ARS'}
            </InputGroupAddon>
            <Input type="number" name="amount_to_send" />
          </InputGroup>
        </FormGroup>
      </Fragment>
    )
  }
}

export default OriginForm

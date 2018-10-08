import React, { Component } from 'react'
import { Alert, Col, Container, Jumbotron, Row } from 'reactstrap'
import OriginForm from './components/OriginForm'
import DestinationForm from './components/DestinationForm'
import { connect } from 'react-redux'
import StepsList from './components/StepsList'

const roundedCeil = (num, decimals) => Math.ceil(num * Math.pow(10, decimals)) / Math.pow(10, decimals)
const roundedFloor = (num, decimals) => Math.floor(num * Math.pow(10, decimals)) / Math.pow(10, decimals)

const appStyle = {
  backgroundColor: '#282c34',
  minHeight: '100vh',
  color: 'white'
}

class App extends Component {
  generatedBtc() {
    return roundedFloor(this.props.value / this.props.ask, 8)
  }
  generatedFiat() {
    return roundedCeil((this.props.value / this.props.ask) * this.props.bid, 2)
  }
  generatedTotal() {
    return roundedCeil((this.props.value / this.props.ask) * this.props.bid * .99, 2)
  }
  neededBtc() {
    return roundedFloor(this.props.value / this.props.bid, 8)
  }
  neededFiat() {
    return roundedCeil((this.props.value / this.props.bid) * this.props.ask, 2)
  }
  neededTotal() {
    return roundedCeil(((this.props.value / this.props.bid) * this.props.ask) / .99, 2)
  }
  getOriginTickerUrl() {
    return `https://bitex.la/api-v1/rest/btc_${this.props.origin.currency.toLowerCase()}/market/ticker`
  }
  getDestinationTickerUrl() {
    return `https://bitex.la/api-v1/rest/btc_${this.props.destination.currency.toLowerCase()}/market/ticker`
  }

  render() {
    return (
      <div style={appStyle}>
        <Jumbotron className="text-dark text-center">
          <h1 className="display-3">Simulador de remesas</h1>
          <p className="lead">
            Esta página es una guía para la integración de usuarios de Bitex para
            realizar remesas internacionales autogestionadas.
          </p>
          <hr className="my-2" />
          <p>
            Para más información, puede visitar <a href="https:/bitex.la/developers">https:/bitex.la/developers</a>,
            o bien contactarnos a <a href="mailto:developers@bitex.la">developers@bitex.la</a>
          </p>
        </Jumbotron>
        <Container>
          <Row>
            <Col>
              <OriginForm />
            </Col>
            <Col>
              <DestinationForm />
            </Col>
          </Row>
          {
            (this.props.bid && this.props.ask && this.props.amount_edited) ?
              <Row>
              {
                (this.props.amount_edited === 'origin') ?
                  <Alert color="info" className="w-100">
                    <p>{this.props.value} {this.props.origin.currency} / {this.props.ask} = {this.generatedBtc()} BTC</p>
                    <p>{this.generatedBtc()} x {this.props.bid} {this.props.destination.currency} = {this.generatedFiat()} {this.props.destination.currency}</p>
                    <p>{this.generatedFiat()} {this.props.destination.currency} - 1% fee (*) = {this.generatedTotal()} {this.props.destination.currency}</p>
                    <p className="font-weight-bold">Monto final a recibir: {this.generatedTotal()} {this.props.destination.currency}</p>
                    <p>(*) Para calcular el fee, se multiplica por 0.99, ya que esta es la proporción que percibe el receptor.</p>
                    <p>
                      Los datos del mejor Ask y mejor Bid fueron obtenidos de los siguientes endpoints, respectivamente: <br/>
                      <a href={this.getOriginTickerUrl()} target="_blank" rel="noopener noreferrer">{ this.getOriginTickerUrl() }</a> <br/>
                      <a href={this.getDestinationTickerUrl()} target="_blank" rel="noopener noreferrer">{ this.getDestinationTickerUrl() }</a> <br/>
                    </p>
                  </Alert>
                  :
                  <Alert color="info" className="w-100">
                    <p>{this.props.value} {this.props.destination.currency} / {this.props.bid} = {this.neededBtc()} BTC</p>
                    <p>{this.neededBtc()} x {this.props.ask} {this.props.origin.currency} = {this.neededFiat()} {this.props.origin.currency}</p>
                    <p>{this.neededFiat()} {this.props.origin.currency} + 1% fee (*) = {this.neededTotal()} {this.props.origin.currency}</p>
                    <p className="font-weight-bold">Monto final a transferir: {this.neededTotal()} {this.props.origin.currency}</p>
                    <p>(*) Para calcular el fee, se divide por 0.99, ya que esta es la proporción que percibe el receptor.</p>
                    <p>
                      Los datos del mejor Ask y mejor Bid fueron obtenidos de los siguientes endpoints, respectivamente: <br/>
                      <a href={this.getOriginTickerUrl()} target="_blank" rel="noopener noreferrer">{ this.getOriginTickerUrl() }</a> <br/>
                      <a href={this.getDestinationTickerUrl()} target="_blank" rel="noopener noreferrer">{ this.getDestinationTickerUrl() }</a> <br/>
                    </p>
                  </Alert>
              }
              </Row>
              : null
          }
          <hr className="border-light" />
          <h4 className="mb-3">Pasos a seguir:</h4>
          <StepsList />
        </Container>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  bid: state.bid,
  ask: state.ask,
  origin: state.origin,
  destination: state.destination,
  amount_edited: state.amount_edited,
  value: state.value
})

export default connect(mapStateToProps)(App)

import React, { Component } from 'react'
import { Alert, Col, Container, Jumbotron, Row } from 'reactstrap'
import OriginForm from './components/OriginForm'
import DestinationForm from './components/DestinationForm'

const steps = [
  {
    description: 'Crear el usuario destinatario',
    url: 'https://bitex.la/developers#resellers'
  },
  {
    description: 'Carga de perfil para los usuarios',
    url: 'https://bitex.la/developers#account-information',
    has_lag: true,
    impersonate: true
  },
  {
    description: 'Comprar BTC',
    url: 'https://bitex.la/developers#api_create_a_bid_buy_order'
  },
  {
    description: 'Transferir BTC desde la cuenta de naranja a la del usuario destinatario',
    substeps: [
      {
        description: 'Obtener la dirección de depósito de BTC del usuario destinatario. El request devuelve el campo "btc_deposit_address"',
        url: 'https://bitex.la/developers#api_profile_and_balances',
        impersonate: true
      },
      {
        description: 'Hacer un retiro de BTC hacia esa dirección:',
        url: 'https://bitex.la/developers#funding-btc'
      }
    ]
  },
  {
    description: 'Vender BTC',
    url: 'https://bitex.la/developers#api_create_an_ask_sell_order',
    impersonate: true
  },
  {
    description: 'Crear instrucción de retiro',
    url: 'https://bitex.la/developers#api_create_a_usd_withdrawal_instruction',
    impersonate: true
  },
  {
    description: 'Pedir un retiro como el usuario',
    url: 'https://bitex.la/developers#api_create_a_usd_withdrawal'
  },
  {
    description: 'Consultar el estado de un retiro',
    url: 'https://bitex.la/developers#api_show_a_usd_withdrawal'
  }
]

const appStyle = {
  backgroundColor: '#282c34',
  minHeight: '100vh',
  color: 'white'
}

class App extends Component {
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
          <hr className="border-light" />
          <h4 className="mb-3">Pasos a seguir:</h4>
          {
            steps.map((step, index) => (
              <Row key={index}>
                <Alert color="success" className="w-100">
                  <p>{ step.description }</p>
                  <a href={step.url}>{ step.url }</a>
                </Alert>
              </Row>
            ))
          }
        </Container>
      </div>
    )
  }
}

export default App

import React, { Component } from 'react'
import './App.css'
import { Container, Row, Alert } from 'reactstrap'

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

class App extends Component {
  render() {
    return (
      <div className="App">
        <Container>
          {
            steps.map((step, index) => (
              <Row key={index}>
                <Alert color="success" className="w-100">
                  { step.description }
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

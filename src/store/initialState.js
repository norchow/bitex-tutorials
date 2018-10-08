export default {
  origin: {
    country: null,
    currency: '$'
  },
  destination: {
    country: null,
    currency: '$'
  },
  receiver: 'self',
  steps: {
    create_sender: {
      description: 'Crear el usuario emisor',
      url: 'https://bitex.la/developers#create-user'
    },
    create_receiver: {
      description: 'Crear el usuario destinatario',
      url: 'https://bitex.la/developers#create-user'
    },
    create_profile: {
      description: 'Carga de perfil para los usuarios. (IMPORTANTE: Este paso requiere de una aprobación manual de parte de Bitex.)',
      url: 'https://bitex.la/developers#account-information',
      has_lag: true,
      impersonate: true
    },
    buy_btc: {
      description: 'Comprar BTC',
      url: 'https://bitex.la/developers#api_create_a_bid_buy_order'
    },
    transfer_btc: {
      description: 'Transferir BTC desde la cuenta del emisor a la del usuario destinatario',
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
    sell_btc: {
      description: 'Vender BTC',
      url: 'https://bitex.la/developers#api_create_an_ask_sell_order',
      impersonate: true
    },
    create_withdrawal_instructions: {
      description: 'Crear instrucción de retiro',
      url: 'https://bitex.la/developers#api_create_a_usd_withdrawal_instruction',
      impersonate: true
    },
    request_withdrawal: {
      description: 'Pedir un retiro como el usuario',
      url: 'https://bitex.la/developers#api_create_a_usd_withdrawal'
    },
    check_withdrawal_status: {
      description: 'Consultar el estado de un retiro',
      url: 'https://bitex.la/developers#api_show_a_usd_withdrawal'
    }
  }
}

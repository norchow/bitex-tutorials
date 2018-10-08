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
      url: 'https://bitex.la/developers#create-user',
      requestPayload: `
        {
          "api_key": "your_api_key",
          "email": "sender@example.com",
          "password": "5up3r53cr37"
        }
      `,
      responsePayload: `
        {
          "user_id": 5000,
          "kyc_profile_id": 5010
        }
      `
    },
    create_receiver: {
      description: 'Crear el usuario destinatario',
      url: 'https://bitex.la/developers#create-user',
      requestPayload: `
        {
          "api_key": "your_api_key",
          "email": "receiver@example.com",
          "password": "5up3r53cr37"
        }
      `,
      responsePayload: `
        {
          "user_id": 5001,
          "kyc_profile_id": 5011
        }
      `
    },
    create_profile: {
      description: 'Carga de perfil para los usuarios. (IMPORTANTE: Este paso requiere de una aprobación manual de parte de Bitex.)',
      url: 'https://bitex.la/developers#api_create_a_kyc_profile',
      has_lag: true,
      impersonate: true,
      requestPayload: `
        {
          "api_key": "your_api_key",
          "as_user": 5000, //IMPORTANT!!
          "first_name": "Billy",
          "last_name": "Bob",
          "personal_id_number": "33222111N",
          "personal_id_issuer_country": "AR",
          "personal_id_type": "passport",
          "tax_id": 4333222115,
          "birth_date": "1970/1/30",
          "nationality": "brazilian",
          "gender": "male",
          "occupation": "Singer",
          "home_address": "Argentina, Bue...",
          "work_address": "Argentina, Bue...",
          "phone_numbers": 555120921,
          "legal_entity": true,
          "politically_exposed_person": true
        }
      `
    },
    buy_btc: {
      description: 'Comprar BTC',
      url: 'https://bitex.la/developers#api_create_a_bid_buy_order',
      requestPayload: `
      {
        "api_key": "your_api_key",
        "amount": "10000.05",
        "price": "500.00",
        "orderbook": 1 //Orderbook ID. 1 = BTC/USD, 5 = BTC/ARS, 10 = BTC/PYG, 11 = BTC/CLP, 12 = BTC/UYU
      }
      `
    },
    transfer_btc: {
      description: 'Transferir BTC desde la cuenta del emisor a la del usuario destinatario',
      substeps: [
        {
          description: 'Obtener la dirección de depósito de BTC del usuario destinatario. El request devuelve el campo "btc_deposit_address"',
          url: 'https://bitex.la/developers#api_profile_and_balances',
          impersonate: true,
          requestPayload: `
            {
              "api_key": "your_api_key",
              "as_user": "5001"
            }
          `,
          responsePayload: `
            {
              "usd_balance": 10000.00,
              "usd_reserved": 2000.00,
              "usd_available": 8000.00,
              "btc_balance": 20.00000000,
              "btc_reserved": 5.00000000,
              "btc_available": 15.00000000,
              "fee": 0.5,
              "btc_deposit_address": "1XXXXXXXX...",
            }
          `
        },
        {
          description: 'Hacer un retiro de BTC hacia esa dirección:',
          url: 'https://bitex.la/developers#api_create_btc_withdrawal',
          requestPayload: `
            {
              "api_key": "your_api_key",
              "address": "1XXXXXXXX...",
              "amount": 100.00,
              "label": "some_label",
              "kyc_profile_id": 5011
            }
          `
        }
      ]
    },
    sell_btc: {
      description: 'Vender BTC',
      url: 'https://bitex.la/developers#api_create_an_ask_sell_order',
      impersonate: true,
      requestPayload: `
        {
          "api_key": "your_api_key",
          "amount": "10.00",
          "price": "500.00",
          "orderbook": 1 //Orderbook ID. 1 = BTC/USD, 5 = BTC/ARS, 10 = BTC/PYG, 11 = BTC/CLP, 12 = BTC/UYU
        }
      `
    },
    create_withdrawal_instructions: {
      description: 'Crear instrucción de retiro',
      url: 'https://bitex.la/developers#api_create_a_usd_withdrawal_instruction',
      impersonate: true,
      requestPayload: `
        {
          "api_key":  "your_api_key",
          "as_user": 5001,
          "body": {   
            "payment_method":           "domestic_bank",  
            "country":                             "AR",  // Bank country. Choices are AR, PY or PE.
            "currency":                           "ARS",  // Which currency to withdraw to. Different choices available for each country. 
                                                          // AR: ARS or USD
                                                          // PE: PEN or USD
            "bank":                              "bbva",  // Beneficiary bank name.
                                                          // Abbreviated and normalized, different choices available for each country. 
                                                          // AR: galicia, bbva, santander, itau, icbc, hsbc, patagonia, credicoop, supervielle,
                                                          // comafi, citi, macro, hipotecario, columbia, bind, nacion, ciudad, bapro, san_juan,
                                                          // santa_cruz, cordoba, santa_fe, entre_rios, la_pampa, neuquen, corrientes,
                                                          // santiago_del_estero, tierra_del_fuego, formosa, la_rioja, chaco, banco_de_valores, finansur 
                                                          // PE: credito, continental, nacion, scotia, interbank, mi_banco, trabajo, financiero, bbva_pe
            "name":                          "John Doe",  // The account holder name. Must be the same person that owns the source bitex account.
            "city":                      "Buenos Aires",  // City of residence of the account holder.
            "address":  "Evergreen avenue 123 zip 1234",  // Home or work postal address for the account holder.
            "phone":                     "15-555-55-55",  // A contact phone number to reach the account holder.
            "cuit":                         "111111111",  // Tax ID, or other ID used on the given country tax agency. For Argentina this is 11 consecutive digits. no dashes.
            "cbu":               2220000200000000000002,  // Bank account ID for transfers across domestic banks. CBU for Argentina, 22 consecutive digits. No dashes, no spaces, leading zeros if needed.
            "bank_account_number":             33433333,  // Domestic bank account number. Consecutive digits, no dashes no spaces. Length varies between banks and countries.
            "account_type":                  "checking",  // Choices are: checking and savings
            "extra_fields":       "You can add anything"  // You can include any extra fields you want, they will be stored but won't be validated
          },
          "label":      "Some Label",  // Optional. For your convenience.
          "schema":          "bitex"   // Optional. Defaults to bitex. See the response description for more information.
        }
      `
    },
    request_withdrawal: {
      description: 'Pedir un retiro como el usuario',
      url: 'https://bitex.la/developers#api_create_a_usd_withdrawal',
      requestPayload: `
        {
          "api_key": "your_api_key",
          "as_user": "5001",
          "amount": 100.00,
          "withdrawal_instruction_id": 1,
          "kyc_profile_id": 5011
        }
      `
    },
    check_withdrawal_status: {
      description: 'Consultar el estado de un retiro',
      url: 'https://bitex.la/developers#api_show_a_usd_withdrawal',
      requestPayload: `
        {
          "api_key": "your_api_key",
          "as_user": "5001"
        }
      `,
      responsePayload: `
        [   
          8,  // It's a USD Withdrawal, see our API class reference
          12345678,  // Withdrawal id
          946685400,  // Creation time as UNIX timestamp.
          100.00000000,  // Requested withdrawal Amount in USD
          1,  // An integer representing this withdrawal status:
                // 1 - Received, our engine is checking if you have enough funds, should be quick.
                // 2 - Pending, your withdrawal was accepted and is being processed, may take a few hours.
                // 3 - Done, your withdrawal was processed.
                // 4 - Cancelled, your withdrawal could not be processed, check the 'reason' field"
          0,  // An integer representing the cancellation reason:
                //  0 - Not cancelled.
                //  1 - The instruction was received, but could not be afforded.
                //  2 - We could not understand the instructions you provided.
                //  3 - We do not know the recipient of this withdrawal.
          "UY",  // Country ouf destination for this withdrawal. Possible values are AR, BR, CL, CO, PE, UY, MX and US.
          "UYU",  // Currency in which this withdrawal will be paid, Possible values are ARS, BRL, CLP, COP, PEN, UYU, MXN and USD. Check our rates API for cash_out currency conversion rates.
          "bb",  // Cash Out method, one of:
                // "international_bank" - International bank transfer.
                // "bb" - Other payment method, to be arranged with our staff.
          "Billy Bob",  // An optional custom label for this withdrawal info
                  1,  // Kyc Profile ID for which this deposit was instructed.
              {...},  // The Withdrawal Instructions provided for this withdrawal.
                  3  // Id of the actual currency debited on bitex, as you may end up receiving local currency from a withdrawal to your USD balance. 3 means you'll be debited United States Dollars. We may enable balances in other currencies in the future.
          ]
      `
    }
  }
}

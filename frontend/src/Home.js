import React, { Component } from 'react';

export default class Home extends Component {
  render() {
    return (
      <div>
        <div className="card mb-3">
          <div className="card-header">
            <h2>Welcome!</h2>
          </div>
          <div className="card-body">
            <p>
              There is a menu above with the three main parts of the test.
              Click to see each one. The Countries and Slot machine are described below.
              The SQL part is just theorical, so is explained on its own page.
            </p>
            <p>
              The application is hosted at Heroku for demonstration purposes.
              I am using a REDIS database for the Slot Machine to save user balances.
              The choice for REDIS was because it has no cost on Heroku. The ideal to
              store financial data would be a ACID database where we can have good reliability.
            </p>
            <p>Thank you!</p>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-header">
            <h2>Countries</h2>
          </div>
          <div className="card-body">
            <p>
              There are 3 backend APIs for this task:
              <ul>
                <li>
                  <strong>GET /api/countries/getAll</strong> <br/>
                  This endpoint list all countries and its data.
                </li>
                <li>
                  <strong>GET /api/countries/getByName?name=&lt;country_name&gt;</strong> <br/>
                  This endpoint list all countries and its data.
                </li>
                <li>
                  <strong>GET /api/countries/search?name[]=&lt;country1&gt;&amp;name[]=&lt;country2&gt;</strong> <br/>
                  This endpoint search all names given. Example:
                  <pre>GET /api/countries/search?name[]=brazil&amp;name[]=malta</pre>
                </li>
              </ul>
            </p>
          </div>
        </div>

        <div className="card mb-3">
          <div className="card-header">
            <h2>Slot Machine</h2>
          </div>
          <div className="card-body">
            <p>
              There are 4 backend APIs for this task:
              <ul>
                <li>
                  <strong>GET /api/slot/start</strong> <br/>
                  Generate a new account. It is used to control individual
                  balance for each user.
                </li>
                <li>
                  <strong>GET /api/slot/balance?wallet=&lt;walletId&gt;</strong> <br/>
                  Get current balance
                </li>
                <li>
                  <strong>GET /api/slot/addCredits?wallet=&lt;walletId&gt;</strong> <br/>
                  Add 20 more credits to the specified account
                </li>
                <li>
                  <strong>GET /api/slot/spin?wallet=&lt;walletId&gt;</strong> <br/>
                  Generate a new spin. It subtract 1 credit from user wallet
                  and credit the prize (if the case).
                </li>
              </ul>
            </p>
          </div>
        </div>

      </div>
    );
  }
}

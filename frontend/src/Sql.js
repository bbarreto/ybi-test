import React, { Component } from 'react'
import SyntaxHighlighter from 'react-syntax-highlighter/prism'
import { dark } from 'react-syntax-highlighter/styles/prism'

import SqlCode from './eer-casino.json'
import EerModel from './images/eer-casino.png'

export default class Sql extends Component {
  render() {

    return (
      <div>
        <h1>SQL Part</h1>

        <h3>Question 1</h3>
        <p>
          Use these sentences to draw a schema of a database you would create to
          store these information.
        </p>
        <ul>
          <li>
            You are working in a casino.
          </li>
          <li>
            A casino has games.
          </li>
          <li>
            Each game has a unique type.
          </li>
          <li>
            Each game has one or more countries where players are allowed to bet
            from. A player may or may not have a favorite game
          </li>
        </ul>

        <div className="text-center my-5">
          <img className="img-fluid" src={EerModel} alt="EER Model" />
        </div>

        <SyntaxHighlighter language='sql' style={dark} showLineNumbers={true}>
        {SqlCode.create}
        </SyntaxHighlighter>

        <h3 className="mt-5">Question 2</h3>
        <p>
          Write based on above, a SQL query to get all players that have games
          of type “SLOT” as their favorite games.
        </p>
        <SyntaxHighlighter language='sql' style={dark} showLineNumbers={true}>
        {SqlCode.query}
        </SyntaxHighlighter>
      </div>
    );
  }
}

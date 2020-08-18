import React, { Component } from 'react';

import StockRow from './StockRow';
import { stock } from '../resources/stock';

export default class StockList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastTradingDate: null,
    };
  }

  componentDidMount() {
    stock
      .getLastTradingDate()
      .then(data => this.setState({ lastTradingDate: data[0].date }));
  }

  render() {
    const { lastTradingDate } = this.state;
    return (
      <ul className='list-group list-group-flush'>
        <StockRow ticker='fb' lastTradingDate={lastTradingDate} />
        <StockRow ticker='amzn' lastTradingDate={lastTradingDate} />
        <StockRow ticker='aapl' lastTradingDate={lastTradingDate} />
        <StockRow ticker='nflx' lastTradingDate={lastTradingDate} />
        <StockRow ticker='goog' lastTradingDate={lastTradingDate} />
      </ul>
    );
  }
}

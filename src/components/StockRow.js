// import React, { useEffect, useState } from 'react';

// import { iex } from '../config/iex';

// function StockRow({ ticker }) {
//   const [stock, setStock] = useState([]);

//   const loadData = async () => {
//     const url = `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
//     fetch(url)
//       .then(response => response.json())
//       .then(data => {
//         console.log(data);
//         setStock(data[data.length - 1]);
//       })
//       .catch(e => {
//         console.log('fetch failed');
//       });
//   };

//   useEffect(() => {
//     loadData();
//   }, [ticker]);

//   return (
//     // <p>{stock.date}</p>
//       {stock.map(x => (
//     <tr>
//           <td>{ticker}</td>
//           <td>{x.date}</td>
//           <td>{x.label}</td>
//           <td>{x}</td>
//           </tr>
//       ))}
//   );
// }

// export default StockRow;

import React, { Component } from 'react';

import { stock } from '../resources/stock';

export default class StockRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      price: null,
      date: null,
      time: null,
      dollar_change: null,
      percent_change: null,
    };
  }
  changeStyle() {
    return {
      color: this.state.dollar_change > 0 ? '#4caf50' : '#e53935',
      fontSize: '0.8rem',
      marginLeft: 5,
    };
  }

  applyData(data) {
    const formattedPrice =
      data.price === undefined ? null : data.price.toFixed(2);
    this.setState({
      price: formattedPrice,
      date: data.date,
      time: data.time,
    });
    stock.getYesterdayClose(this.props.ticker, data.date, yesData => {
      const dollar_change = (data.price - yesData.price).toFixed(2);
      const percent_change = ((100 * dollar_change) / yesData.price).toFixed(2);
      this.setState({
        dollar_change: `${dollar_change}`,
        percent_change: `(${percent_change}%)`,
      });
    });
  }

  componentDidMount() {
    stock.latestPrice(this.props.ticker, this.applyData.bind(this));
  }

  render() {
    const { time, price, date, dollar_change, percent_change } = this.state;
    const { ticker } = this.props;
    return (
      <li className='list-group-item'>
        <b>{ticker}</b> {price}
        <span className='change' style={this.changeStyle()}>
          {dollar_change}
          &nbsp;{percent_change}
        </span>
      </li>
    );
  }
}

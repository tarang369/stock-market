import { iex } from '../config/iex';

export const stock = {
  latestPriceURL: ticker => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`;
  },
  yesterdayCloseURL: (ticker, date) => {
    const lastTradeDay = stock.formatDate(date);
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&exactDate=${lastTradeDay}&token=${iex.api_token}`;
  },
  getLastTradingDate: date => {
    let today = stock.formatDate(date);
    const url = `${iex.base_url}/ref-data/us/dates/trade/last/1/${today}?token=${iex.api_token}`;
    return fetch(url).then(res => res.json());
  },
  formatPriceData: data => {
    const stockData = data[data.length - 1];
    const formattedData = {};
    formattedData.price = stockData.close;
    formattedData.date = stockData.date;
    formattedData.time = stockData.label;
    return formattedData;
  },
  formatDate: date =>
    new Date(date).toISOString().split('T')[0].replace(/-/g, ''),
  latestPrice: (ticker, callback) => {
    fetch(stock.latestPriceURL(ticker))
      .then(response => response.json())
      .then(data => callback(stock.formatPriceData(data)));
  },
  getYesterdayClose: (ticker, date, callback) => {
    stock.getLastTradingDate(date).then(data => {
      fetch(stock.yesterdayCloseURL(ticker, data[0].date))
        .then(response => response.json())
        .then(data => callback(stock.formatPriceData(data)));
    });
  },
};

import { iex } from '../config/iex';

export const stock = {
  latestPriceURL: ticker =>
    `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&token=${iex.api_token}`,

  yesterdayCloseURL: (ticker, lastTradingDate) => {
    return `${iex.base_url}/stock/${ticker}/intraday-prices?chartLast=1&exactDate=${lastTradingDate}&token=${iex.api_token}`;
  },

  latestPrice: (ticker, callback) => {
    fetch(stock.latestPriceURL(ticker))
      .then(response => response.json())
      // .then(data => console.log('aaa', data))
      .then(data => callback(stock.formatPriceData(data)));
  },

  formatPriceData: data => {
    const stockData = data[data.length - 1];
    const formattedData = {};
    formattedData.price = stockData.close;
    formattedData.date = stockData.date;
    formattedData.time = stockData.label;
    return formattedData;
  },

  getYesterdayClose: (ticker, lastTradingDate, callback) => {
    // eslint-disable-next-line
    if (lastTradingDate != '' && lastTradingDate != undefined) {
      const url = stock.yesterdayCloseURL(
        ticker,
        stock.formatDate(lastTradingDate)
      );
      fetch(url)
        .then(response => response.json())
        .then(data => callback(stock.formatPriceData(data)));
    }
  },
  getLastTradingDate: () => {
    const today = new Date().toISOString().split('T')[0].replace(/-/g, '');
    const url = `${iex.base_url}/ref-data/us/dates/trade/last/1/${today}?token=${iex.api_token}`;
    return fetch(url).then(res => res.json());
  },

  formatDate: date =>
    new Date(date).toISOString().split('T')[0].replace(/-/g, ''),
};

import { Component, Element, h, State } from '@stencil/core';

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {

  @Element() el: HTMLElement;
  @State() price: number;

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    const symbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`)
      .then(res => { return res.json(); })
      .then(parsedRes => {
        this.price = parsedRes['Global Quote']['05. price'];
        console.log(parsedRes['Global Quote']['05. price'])
      })
      .catch(err => console.log(err))
  }

  render() {
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol"></input>
        <button type="submit">Fetch</button>
      </form>,
      <div>
        <p>Price: {this.price}</p>
      </div>
    ]
  }

}

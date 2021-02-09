import { Component, Element, h, Prop, State, Watch } from '@stencil/core';

@Component({
  tag: 'uc-stock-price',
  styleUrl: './stock-price.css',
  shadow: true
})
export class StockPrice {

  @Element() el: HTMLElement;
  @State() price: number;
  @State() stockUserInput: string;
  @State() validForm = false;
  @State() error;

  @Prop({ mutable: true, reflect: true }) stockSymbol: string;

  @Watch('stockSymbol')
  stockSymbolChanged(newValue: string, oldValue: string) {
    if (newValue !== oldValue) {
      this.stockUserInput = newValue;
      this.fetchData(newValue);
    }
  }

  symbolInput: HTMLInputElement;

  onFetchStockPrice(event: Event) {
    event.preventDefault();
    //const symbol = (this.el.shadowRoot.querySelector('#stock-symbol') as HTMLInputElement).value;
    const symbol = this.symbolInput.value;
    this.fetchData(symbol);
  }

  fetchData(symbol: string) {
    fetch(`https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=${symbol}&apikey=demo`)
      .then(res => { return res.json(); })
      .then(parsedRes => {
        if (!parsedRes['Global Quote'] || !parsedRes['Global Quote']['05. price']) {
          throw new Error('Invalid sysmble');
        }
        this.error = null;
        this.price = parsedRes['Global Quote']['05. price'];
      })
      .catch(err => this.error = err.message)
  }

  componentDidLoad() {
    if (this.stockSymbol) {
      this.symbolInput.value = this.stockSymbol;
      this.fetchData(this.stockSymbol);
    }
  }

  render() {
    let content = <p>Pleae enter the symbol</p>;
    if (this.error) {
      content = <p class="error">{this.error}</p>
    } else if (this.price) {
      content = <p>Price: {this.price}</p>;
    }
    return [
      <form onSubmit={this.onFetchStockPrice.bind(this)}>
        <input id="stock-symbol" ref={el => this.symbolInput = el} value={this.stockUserInput}
          onInput={this.onInputChange.bind(this)}
        ></input>
        <button type="submit" disabled={!this.validForm}>Fetch</button>
      </form>,
      <div>
        {content}
      </div>
    ]
  }

  onInputChange(event: Event) {
    this.stockUserInput = (event.target as HTMLInputElement).value;
    this.validForm = this.stockUserInput.trim().length > 0
  }

}

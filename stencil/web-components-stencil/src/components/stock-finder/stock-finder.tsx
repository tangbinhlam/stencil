import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'uc-stock-finder',
  styleUrl: './stock-finder.css',
  shadow: true
})
export class StockFinder {
  @State() symbolInput: HTMLInputElement;

  onFindStock(event: Event) {
    event.preventDefault();
  }

  render() {
    return [
      <form onSubmit={this.onFindStock.bind(this)}>
        <input id="stock-symbol" ref={el => this.symbolInput = el}
        ></input>
        <button type="submit">Fetch</button>
      </form>,
    ]
  }
}

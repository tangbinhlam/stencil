import { Component, h, Prop } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {

  @Prop({ reflect: true }) title: string = 'My Title';
  @Prop({ reflect: true, mutable: true }) open: boolean;

  render() {
    return (
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <main>
          <slot></slot>
        </main>
      </aside>
    );
  }

  onCloseDrawer() {
    this.open = false;
  }
}

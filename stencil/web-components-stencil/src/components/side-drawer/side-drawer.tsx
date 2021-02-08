import { Component, h, Prop, State } from '@stencil/core';

@Component({
  tag: 'uc-side-drawer',
  styleUrl: './side-drawer.css',
  shadow: true,
})
export class SideDrawer {
  @State() showContactInfo = false;
  @Prop({ reflect: true }) title: string = 'My Title';
  @Prop({ reflect: true, mutable: true }) open: boolean;

  render() {
    let mainContent = <slot />;
    if (this.showContactInfo) {
      mainContent = (
        <div id="mainContent">
          <h2>Contact Information</h2>
          <p>You can get me with my phone or email</p>
          <ul>
            <li>Phone: 408 2812346</li>
            <li>E-mail: <a href="mailto:mymail.@mail.com">mymai@mail.com</a></li>
          </ul>
        </div>
      );
    }
    return (
      <aside>
        <header>
          <h1>{this.title}</h1>
          <button onClick={this.onCloseDrawer.bind(this)}>X</button>
        </header>
        <section id="tabs">
          <button id="btnNavigate"
            onClick={this.onContentChange.bind(this, 'nav')}
            class={this.showContactInfo ? '' : 'active'}
          >Navigation</button>
          <button
            class={this.showContactInfo ? 'active' : ''}
            id="btnContact"
            onClick={this.onContentChange.bind(this, 'contact')}>Contact</button>
        </section>
        <main>
          {mainContent}
        </main>
      </aside>
    );
  }

  onCloseDrawer() {
    this.open = false;
  }

  onContentChange(content: string) {
    this.showContactInfo = content === 'contact';
  }
}

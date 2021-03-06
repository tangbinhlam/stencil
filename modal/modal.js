customElements.define('uc-modal', class Modal extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.isOpen = false;
        this.shadowRoot.innerHTML = `
            <style>
                #backdrop {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100vh;
                    background: rgba(0,0,0,0.75);
                    z-index: 10;
                    opacity: 0;
                    pointer-events: none;
                }

                :host([opened]) #backdrop {
                    opacity: 1;
                    pointer-events: all;
                }

                :host([opened]) #modal {
                    opacity: 1;
                    pointer-events: all;
                }

                :host([opened]) #modal {
                    top: 20vh;
                }

                #modal {
                    position: fixed;
                    top: 10vh;
                    left: 30%;
                    width: 40%;
                    z-index: 100;
                    background: white;
                    border-radius: 3px;
                    box-shadow: 0 2px 8px rgba(0,0,0,0.26);
                    display: flex;
                    flex-direction: column;
                    justify-content: space-between;
                    opacity: 0;
                    pointer-events: none;
                    transition: all 0.5s ease-out;
                }

                header {
                    padding: 1rem;
                    border-bottom: 1px solid #ccc;
                }

                ::slotted(h1) {
                    font-size: 1.25rem;
                    margin: 0;
                }

                header h1{
                    front-size: 1.25rem;
                }

                #actions {
                    border-top: 1px solid #ccc;
                    padding: 1rem;
                    display: flex;
                    justify-content: flex-end;
                }

                #actions button {
                    margin: 0 0.25rem;
                }

                #main {
                    padding: 1rem;
                }
            </style>
            <div id="backdrop"></div>
            <div id="modal">
                <header>
                    <slot name="title"><h1>Please confirm default without define</h1></slot>
                </header>
                <section id="main">
                    <slot></slot>
                </section>
                <section id="actions">
                    <button id="cancelBtn">Cancel</button>
                    <button id="okBtn">OK</button>
                </section>
            </div>
        `

        const slots = this.shadowRoot.querySelectorAll('slot');
        slots[0].addEventListener('slotchange', event => {
            console.dir(slots[1].assignedNodes());
        });

        const cancelBtn = this.shadowRoot.querySelector('#cancelBtn');
        const okBtn = this.shadowRoot.querySelector('#okBtn');
        cancelBtn.addEventListener('click', this._cancel.bind(this));
        okBtn.addEventListener('click', this._ok.bind(this));

        this.shadowRoot.querySelector('#backdrop').addEventListener('click', this._cancel.bind(this));
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (this.hasAttribute('opened')) {
            this.isOpen = true;
        } else {
            this.isOpen = false;
        }
    }

    static get observedAttributes() {
        return ['opened'];
    }
    open() {
        this.setAttribute('opened', '');
        this.isOpen = true;
    }

    close() {
        if (this.hasAttribute('opened')) {
            this.removeAttribute('opened');
        }
        this.isOpen = false;
    }

    _cancel(event) {
        this.close();
        event.target.dispatchEvent(new Event('cancel', { bubbles: true, composed: true }))
    }

    _ok() {
        this.close();
        this.dispatchEvent(new Event('confirm', { bubbles: true, composed: true }))
    }
})

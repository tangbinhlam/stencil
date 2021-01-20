class Tooltip extends HTMLElement {
    constructor() {
        super();
        console.log('Custom Element is working');
    }
}

customElements.define('osalam-tooltip', Tooltip);

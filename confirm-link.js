class ConfirmLink extends HTMLAnchorElement {
    connectedCallback() {
        this.addEventListener('click', event => {
            if (!confirm(`Do you want to leave`)) {
                event.preventDefault();
            }
        })
    }
}

customElements.define('osalam-confirm-link', ConfirmLink, { extends: 'a' });

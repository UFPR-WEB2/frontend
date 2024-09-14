class NavBarPadrao extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this.build());
        shadow.appendChild(this.styles());
    };
    build() {
        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "container");

        const titulo = document.createElement("h1");
        titulo.textContent = "Barra lateral";
        componentRoot.appendChild(titulo);

        return componentRoot;
    };
    styles() {
        const style = document.createElement("style");
        style.textContent = 
        `
            .container{
                width : 100%;
                height : 86.5dvh;
                display: flex;
                font-family: sans-serif;
                background-color: gray;
            }        
        `;
        return style;
    };
}
customElements.define("lateral-padrao", NavBarPadrao);
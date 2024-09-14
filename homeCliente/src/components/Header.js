class CabecaPadrao extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this.build());
        shadow.appendChild(this.styles());
    };
    build() {
        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "container_top");

        const divLeft = document.createElement("div");
        divLeft.setAttribute("class", "container_top_left");

        const divCenter = document.createElement("div");
        divCenter.setAttribute("class", "container_top_center");

        const divRight = document.createElement("div");
        divRight.setAttribute("class", "container_top_right");

        componentRoot.appendChild(divLeft);
        componentRoot.appendChild(divCenter);
        componentRoot.appendChild(divRight);
        const titulo = document.createElement("h1");
        titulo.textContent = "Manutenção de equipamentos";
        divCenter.appendChild(titulo);

        return componentRoot;
    };
    styles() {
        const style = document.createElement("style");
        style.textContent = `
            .container_top{
                width : 100%;
                height : 13dvh;
                margin-top : 0.5dvh;
                display: flex;
                justify-content: space-between;
            }
            .container_top_left{
                width : 15%;
                background-color: green;
            }
            .container_top_center{
                width : 30%;
                text-align : center;
                background-color: green;
                font-size: 2.4dvh;
                font-family: "Poppins", sans-serif;
                text-transform: uppercase;
            }
            .container_top_center h1{
                margin-top : 0;
                padding-top : 0;
            }
            .container_top_right{
                width : 15%;
                background-color: green;
            }
        
        `;
        return style;
    };
}
customElements.define("cabeca-padrao", CabecaPadrao);
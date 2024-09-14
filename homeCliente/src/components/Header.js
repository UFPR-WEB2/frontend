class CabecaPadrao extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this.build());
        shadow.appendChild(this.styles());
    }

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
        titulo.textContent = "Manutenção de Equipamentos";
        divCenter.appendChild(titulo);

        const nomeCliente = document.createElement("h4");
        nomeCliente.textContent = "Nome do Cliente";
        const emailCliente = document.createElement("h4");
        emailCliente.textContent = "emailDoCliente@gmail.com";
        const linkSair = document.createElement("a");
        const buttonSair = document.createElement("button");
        buttonSair.textContent = "Sair";
        linkSair.appendChild(buttonSair);
        linkSair.href = "../home/index.html";
        divRight.appendChild(nomeCliente);
        divRight.appendChild(emailCliente);
        divRight.appendChild(linkSair);

        return componentRoot;
    }

    styles() {
        const style = document.createElement("style");
        style.textContent = `
            .container_top {
                width: 100%;
                height: 13dvh;
                margin-top: 0.5dvh;
                display: flex;
                justify-content: space-between;
                align-items: center;
                border: 1px solid gray;
                border-radius: 1dvh;
            }

            .container_top_left {
                width: 15%;
            }

            .container_top_center {
                width: 30%;
                text-align: center;
                font-size: 2.4dvh;
                font-family: "Poppins", sans-serif;
                text-transform: uppercase;
            }

            .container_top_center h1 {
                margin: 0;
                padding: 0;
            }

            .container_top_right {
                width: 15%;
                display: flex;
                flex-direction: column;
                align-items: flex-end;
                font-family: "Poppins", sans-serif;
                padding : 0.5dvh;
            }

            .container_top_right h4 {
                margin: 0.5vh 0;
                font-size: 2dvh;
            }

            .container_top_right a {
                margin-top: 1.5vh;
                display: block;
            }

            .container_top_right button {
                padding: 0 1.5rem;
                height: 3dvh;
                font-family: "Poppins", sans-serif;
                font-weight: 600;
                text-transform: uppercase;
                font-size: 1rem;
                background-color: black;
                color: white;
                border: none;
                border-radius: 0.75rem;
                cursor: pointer;
                position: relative;
                z-index: 1;
                overflow: hidden;
            }

            .container_top_right button::before {
                content: "";
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background: linear-gradient(135deg, orange, red);
                z-index: -2;
                border-radius: 0.75rem; 
                padding: 2px;
            }

            .container_top_right button::after {
                content: "";
                position: absolute;
                top: 2px;
                left: 2px;
                width: calc(100% - 4px);
                height: calc(100% - 4px);
                background-color: black;
                border-radius: 0.65rem;
                z-index: -1;
            }

            .container_top_right button:hover::after {
                background: linear-gradient(135deg, red, orange);
            }

            .container_top_right button:active::after {
                background: linear-gradient(135deg, orange, red);
            }
        `;
        return style;
    }
}

customElements.define("cabeca-padrao", CabecaPadrao);

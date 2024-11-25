class NavBarPadrao extends HTMLElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: "open" });
        shadow.appendChild(this.build());
        shadow.appendChild(this.styles());
    }

    build() {
        const componentRoot = document.createElement("div");
        componentRoot.setAttribute("class", "container-lateral");

        const tituloFuncionalidade = document.createElement("h2");
        tituloFuncionalidade.textContent = "Funcionalidades";
        componentRoot.appendChild(tituloFuncionalidade);

        const funcionalidadesList = document.createElement("ul");
        funcionalidadesList.id = "funcionalidades";

        const funcionalidade1 = document.createElement("li");
        const link1 = document.createElement("a");
        link1.href = "../maintenance/index.html"; 
        link1.textContent = "Solicitar Manutenção";
        funcionalidade1.appendChild(link1);
        funcionalidadesList.appendChild(funcionalidade1);
        
        componentRoot.appendChild(funcionalidadesList);

        const tituloFiltro = document.createElement("h2");
        tituloFiltro.textContent = "Filtros";
        componentRoot.appendChild(tituloFiltro);

        const estadoDropdown = document.createElement("select");
        estadoDropdown.id = "estado";

        const estados = ["Orçada", "Aprovada", "Rejeitada", "Arrumada", "Outros estados"]; 
        estados.forEach((estado) => {
            const option = document.createElement("option");
            option.value = estado.toLowerCase(); 
            option.textContent = estado; 
            estadoDropdown.appendChild(option);
        });

        componentRoot.appendChild(estadoDropdown);

        return componentRoot;
    }

    styles() {
        const style = document.createElement("style");
        style.textContent = `
            .container-lateral {
                width: 100%;
                height: 82dvh;
                padding-top: 2dvh;
                font-family: "Poppins", sans-serif;
                padding: 0;
                color : white;
                border: 1px solid gray;
                border-radius: 1dvh;
                box-shadow: 3px 3px 5px rgba(0, 0, 0, 0.5);
                background: linear-gradient(180deg, #000000, #1a1a1a);
            }
            h2, h3 {
                text-align: center;
                color: #FF6700;
                margin-bottom: 1dvh;
            }
            ul {
                list-style: none;
                padding: 0;
                text-align: center;
            }
            li {
                margin-bottom: 1dvh;
                position: relative;
                padding-left: 20px;
            }
            li:before {
                content: "•";
                position: absolute;
                left: 0;
                color: #FF6700;
                font-size: 1.5em;
                line-height: 1;
            }
            a {
                text-decoration: none;
                color: white;
                font-size: 1.2em;
                transition: color 0.3s ease-in-out;
            }
            a:hover {
                color: #FF6700;
            }
            select {
                width: 90%;
                margin: 1dvh auto;
                padding: 0.5dvh;
                background-color: #333;
                color: white;
                border: 1px solid #FF6700;
                border-radius: 0.5dvh;
                display: block;
                text-align: center;
            }
        `;
        return style;
    }
}

customElements.define("lateral-padrao", NavBarPadrao);

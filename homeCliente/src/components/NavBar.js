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

        const titulo = document.createElement("h1");
        titulo.textContent = "Barra lateral";
        componentRoot.appendChild(titulo);

        const tituloFuncionalidade = document.createElement("h3");
        tituloFuncionalidade.textContent = "Funcionalidades";
        componentRoot.appendChild(tituloFuncionalidade);

        const funcionalidadesList = document.createElement("ul");
        funcionalidadesList.id = "funcionalidades";

        const funcionalidade1 = document.createElement("li");
        const link1 = document.createElement("a");
        link1.href = "#"; 
        link1.textContent = "Funcionalidade 1";
        funcionalidade1.appendChild(link1);
        funcionalidadesList.appendChild(funcionalidade1);

        const funcionalidade2 = document.createElement("li");
        const link2 = document.createElement("a");
        link2.href = "#"; 
        link2.textContent = "Funcionalidade 2";
        funcionalidade2.appendChild(link2);
        funcionalidadesList.appendChild(funcionalidade2);

        const funcionalidade3 = document.createElement("li");
        const link3 = document.createElement("a");
        link3.href = "#"; 
        link3.textContent = "Funcionalidade 3";
        funcionalidade3.appendChild(link3);
        funcionalidadesList.appendChild(funcionalidade3);
        
        componentRoot.appendChild(funcionalidadesList);

        const tituloFiltro = document.createElement("h3");
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
                font-family: sans-serif;
                padding: 0;
                color : white;
                border: 1px solid gray;
                border-radius: 1dvh;
            }
            h1,h3,select{
                text-align : center;
            }
        `;
        return style;
    }
}

customElements.define("lateral-padrao", NavBarPadrao);

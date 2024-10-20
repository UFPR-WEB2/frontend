function createProductElement(
    category,
    date,
    description,
    stateDescription
) {
    const stateColors = {
        "ABERTA": "gray",
        "ORÇADA": "brown",
        "REJEITADA": "red",
        "APROVADA": "yellow",
        "REDIRECIONADA": "purple",
        "AGUARDANDO PAGAMENTO": "blue",
        "PAGA": "orange",
        "FINALIZADA": "green"
    };

    let currentState = stateDescription; 

    const stateClass = stateColors[currentState] || "default-state-color";

    const productDiv = document.createElement("div");
    productDiv.className = "product";

    const headerInfoDiv = document.createElement("div");
    headerInfoDiv.className = "header-info";

    const stateInfoDiv = document.createElement("div");
    stateInfoDiv.className = "state-info";
    const stateIndicatorDiv = document.createElement("div");
    stateIndicatorDiv.className = `state ${stateClass}`; 
    const stateDescriptionP = document.createElement("p");
    stateDescriptionP.className = "state-description";
    stateDescriptionP.textContent = currentState;
    stateInfoDiv.appendChild(stateIndicatorDiv);
    stateInfoDiv.appendChild(stateDescriptionP);

    const categoryDiv = document.createElement("div");
    categoryDiv.className = "category";
    const categoryP = document.createElement("p");
    categoryP.textContent = category;
    categoryDiv.appendChild(categoryP);

    const dateDiv = document.createElement("div");
    dateDiv.className = "date";
    const dateP = document.createElement("p");
    dateP.textContent = date;
    dateDiv.appendChild(dateP);

    const openDropdownButton = document.createElement("button");
    openDropdownButton.className = "open-dropdown";
    openDropdownButton.textContent = "Abrir";

    headerInfoDiv.appendChild(stateInfoDiv);
    headerInfoDiv.appendChild(categoryDiv);
    headerInfoDiv.appendChild(dateDiv);
    headerInfoDiv.appendChild(openDropdownButton);

    const dropdownPlusDiv = document.createElement("div");
    dropdownPlusDiv.className = "dropdown-plus";

    const descriptionDiv = document.createElement("div");
    descriptionDiv.className = "description";
    const descriptionH3 = document.createElement("h3");
    descriptionH3.textContent = "Descrição";
    const descriptionP = document.createElement("p");
    descriptionP.textContent = description;
    descriptionDiv.appendChild(descriptionH3);
    descriptionDiv.appendChild(descriptionP);

    const redirectStateButton = document.createElement("button");

    dropdownPlusDiv.appendChild(descriptionDiv);

    const actionButtons = {
        "ABERTA": { text: "Efetuar Orçamento", link: "RF012.html" },
        "APROVADA": { text: "Efetuar Manutenção", link: "../viewSolic/index.html" },
        "REDIRECIONADA": { text: "Efetuar Manutenção", link: "../viewSolic/index.html" },
        "PAGA": { text: "Finalizar Solicitação", link: "RF016.html" }
    };

    const action = actionButtons[currentState];

    if (action) {
        const actionButtonLink = document.createElement("a");
        actionButtonLink.href = action.link;
        const actionButton = document.createElement("button");
        actionButton.textContent = action.text;


        if (currentState === "PAGA" && action.text === "Finalizar Solicitação") {
            actionButton.addEventListener('click', function(event) {
                event.preventDefault(); 

                currentState = "FINALIZADA";
                stateDescriptionP.textContent = currentState;

                const newStateClass = stateColors[currentState];
                stateIndicatorDiv.className = `state ${newStateClass}`;

                const finalizationDate = new Date();
                const options = { day: '2-digit', month: '2-digit', year: 'numeric', 
                                  hour: '2-digit', minute: '2-digit', second: '2-digit' };
                const finalizationDateStr = finalizationDate.toLocaleDateString('pt-BR', options);

                const finalizationDateDiv = document.createElement("div");
                finalizationDateDiv.className = "finalization-date";
                const finalizationDateP = document.createElement("p");
                finalizationDateP.textContent = `Finalizado em: ${finalizationDateStr}`;
                finalizationDateDiv.appendChild(finalizationDateP);

                const employeeName = "Funcionário Responsável";

                const employeeDiv = document.createElement("div");
                employeeDiv.className = "employee";
                const employeeP = document.createElement("p");
                employeeP.textContent = `Finalizado por: ${employeeName}`;
                employeeDiv.appendChild(employeeP);

                dropdownPlusDiv.appendChild(finalizationDateDiv);
                dropdownPlusDiv.appendChild(employeeDiv);

                actionButtonLink.remove();

                redirectStateButton.textContent = currentState;

                dropdownPlusDiv.slideUp();
            });
        }

        actionButtonLink.appendChild(actionButton);
        dropdownPlusDiv.appendChild(actionButtonLink);
    }

    productDiv.appendChild(headerInfoDiv);
    productDiv.appendChild(dropdownPlusDiv);

    const maintenanceList = document.getElementById("maintenance-list");
    maintenanceList.appendChild(productDiv);
}

// Exemplo 1: Estado ABERTA (Cinza)
createProductElement(
    "Notebook",
    "12/12/2023",
    "A tela está quebrada",
    "ABERTA"
);

// Exemplo 2: Estado ORÇADA (Marrom)
createProductElement(
    "Impressora",
    "10/10/2023",
    "Problema no cartucho",
    "ORÇADA"
);

// Exemplo 3: Estado REJEITADA (Vermelho)
createProductElement(
    "Monitor",
    "08/09/2023",
    "Monitor não liga",
    "REJEITADA"
);

// Exemplo 4: Estado APROVADA (Amarelo)
createProductElement(
    "Celular",
    "14/11/2023",
    "Troca de bateria",
    "APROVADA"
);

// Exemplo 5: Estado REDIRECIONADA (Roxo)
createProductElement(
    "Tablet",
    "01/09/2023",
    "Tela com defeito",
    "REDIRECIONADA"
);

// Exemplo 6: Estado AGUARDANDO PAGAMENTO (Azul)
createProductElement(
    "Computador",
    "23/08/2023",
    "Problema na fonte de alimentação",
    "AGUARDANDO PAGAMENTO"
);

// Exemplo 7: Estado PAGA (Alaranjado)
createProductElement(
    "Teclado",
    "18/08/2023",
    "Teclas não funcionam",
    "PAGA"
);

// Exemplo 8: Estado FINALIZADA (Verde)
createProductElement(
    "Mouse",
    "05/07/2023",
    "Botão não responde",
    "FINALIZADA"
);

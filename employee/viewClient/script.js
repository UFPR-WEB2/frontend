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

	const stateClass = stateColors[stateDescription] || "default-state-color";

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
	stateDescriptionP.textContent = stateDescription;
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
	redirectStateButton.className = "redirect-state";
	redirectStateButton.textContent = stateDescription;

	dropdownPlusDiv.appendChild(descriptionDiv);
	dropdownPlusDiv.appendChild(redirectStateButton);

	productDiv.appendChild(headerInfoDiv);
	productDiv.appendChild(dropdownPlusDiv);

	const maintenanceList = document.getElementById("maintenance-list");
	maintenanceList.appendChild(productDiv);
}

createProductElement(
	"Mouse",
	"05/07/2023",
	"Botão não responde",
	"FINALIZADA"
);


createProductElement(
    "Teclado",
    "18/08/2023",
    "Teclas não funcionam",
    "PAGA"
);

createProductElement(
    "Computador",
    "23/08/2023",
    "Problema na fonte de alimentação",
    "AGUARDANDO PAGAMENTO"
);

createProductElement(
    "Tablet",
    "01/09/2023",
    "Tela com defeito",
    "REDIRECIONADA"
);

createProductElement(
    "Impressora",
    "10/10/2023",
    "Problema no cartucho",
    "ORÇADA"
);

createProductElement(
    "Celular",
    "14/11/2023",
    "Troca de bateria",
    "APROVADA"
);

createProductElement(
    "Notebook",
    "12/12/2023",
    "A tela está quebrada",
    "ABERTA"
);
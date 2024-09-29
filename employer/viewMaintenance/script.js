function createProductElement(
	category,
	date,
	description,
	stateDescription,
	stateClass
) {
	const productDiv = document.createElement("div");
	productDiv.className = "product";

	const headerInfoDiv = document.createElement("div");
	headerInfoDiv.className = "header-info";

	const stateDiv = document.createElement("div");
	const stateIndicatorDiv = document.createElement("div");
	stateIndicatorDiv.className = `state ${stateClass}`;
	const stateDescriptionP = document.createElement("p");
	stateDescriptionP.className = "state-description";
	stateDescriptionP.textContent = stateDescription;
	stateDiv.appendChild(stateIndicatorDiv);
	stateDiv.appendChild(stateDescriptionP);

	const categoryDiv = document.createElement("div");
	categoryDiv.className = "category";
	const categoryH3 = document.createElement("h3");
	categoryH3.textContent = "Categoria";
	const categoryP = document.createElement("p");
	categoryP.textContent = category;
	categoryDiv.appendChild(categoryH3);
	categoryDiv.appendChild(categoryP);

	const dateDiv = document.createElement("div");
	dateDiv.className = "date";
	const dateH3 = document.createElement("h3");
	dateH3.textContent = "Data da solicitação";
	const dateP = document.createElement("p");
	dateP.textContent = date;
	dateDiv.appendChild(dateH3);
	dateDiv.appendChild(dateP);

	const openDropdownButton = document.createElement("button");
	openDropdownButton.className = "open-dropdown";
	openDropdownButton.textContent = "Abrir";

	headerInfoDiv.appendChild(stateDiv);
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
	const redirectStateButton = document.createElement("button");
	redirectStateButton.className = "redirect-state";
	redirectStateButton.textContent = stateDescription;
	descriptionDiv.appendChild(descriptionH3);
	descriptionDiv.appendChild(descriptionP);
	descriptionDiv.appendChild(redirectStateButton);

	dropdownPlusDiv.appendChild(descriptionDiv);

	productDiv.appendChild(headerInfoDiv);
	productDiv.appendChild(dropdownPlusDiv);

	const maintenanceList = document.getElementById("maintenance-list");
    maintenanceList.appendChild(productDiv);
}
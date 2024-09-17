function setAddressCamps(data) {
	cityUtils.elem.value = data.localidade;
	addressUtils.elem.value = data.logradouro;
	stateUtils.elem.value = data.uf;
	countryUtils.elem.value = data.pais || "Brasil";
}

function resetAddressCamps() {
	cityUtils.elem.value = "";
	addressUtils.elem.value = "";
	stateUtils.elem.value = "";
	countryUtils.elem.value = "";
}

function validateAll() {
	if (!userNameUtils.validate(userNameUtils.elem.value)) {
		alert("Error: Invalid name");
		userNameUtils.elem.focus();
		return false;
	}
	if (!emailUtils.validate(emailUtils.elem.value)) {
		alert("Error: Invalid email");
		emailUtils.elem.focus();
		return false;
	}
	if (!cpfUtils.validate(cpfUtils.elem.value)) {
		alert("Error: Invalid CPF");
		cpfUtils.elem.focus();
		return false;
	}
	if (!phoneUtils.validate(phoneUtils.elem.value)) {
		alert("Error: Invalid phone number");
		phoneUtils.elem.focus();
		return false;
	}
	if (!cepUtils.validate(cepUtils.elem.value)) {
		alert("Error: Invalid CEP");
		cepUtils.elem.focus();
		return false;
	}
	if (!countryUtils.validate(countryUtils.elem.value)) {
		alert("Error: Invalid country");
		countryUtils.elem.focus();
		return false;
	}
	if (!stateUtils.validate(stateUtils.elem.value)) {
		alert("Error: Invalid state");
		stateUtils.elem.focus();
		return false;
	}
	if (!cityUtils.validate(cityUtils.elem.value)) {
		alert("Error: Invalid city");
		cityUtils.elem.focus();
		return false;
	}
	if (!addressUtils.validate(addressUtils.elem.value)) {
		alert("Error: Invalid address");
		addressUtils.elem.focus();
		return false;
	}
	return true;
}

async function searchCep(cep) {
	try {
		if (cep === lastCepSearch) return;
		lastCepSearch = cep;
		const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
		const data = await response.json();
		if (data.erro) {
			return "CEP not found";
		} else {
			return data;
		}
	} catch (error) {
		console.error("Error fetching CEP data:", error);
		return "Error fetching CEP data";
	}
}

let lastCepSearch = "";

const userNameUtils = {
	elem: document.getElementById("name"),
	format: value => {
		return value.replace(/\d/g, "").trim().replace(/\s+/g, " ");
	},
	validate: value => {
		const formattedValue = userNameUtils.format(value);
		return formattedValue.length > 3;
	},
};

const emailUtils = {
	elem: document.getElementById("email"),
	format: value => {
		return value.trim().toLowerCase();
	},
	validate: value => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		return emailPattern.test(value);
	},
};

const cpfUtils = {
	elem: document.getElementById("cpf"),
	format: value => {
		value = value.replace(/\D/g, "").slice(0, 11);
		return value
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d)/, "$1.$2")
			.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
	},
	validate: value => {
		const cpfPattern = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/;
		return cpfPattern.test(value);
	},
	removeFormat: value => {
		return value.replace(/\D/g, "");
	},
};

cpfUtils.elem.addEventListener("input", e => {
	e.target.value = cpfUtils.format(e.target.value);
});

const phoneUtils = {
	elem: document.getElementById("phone"),
	format: value => {
		value = value.replace(/\D/g, "").slice(0, 11);

		return value.length > 10
			? value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3")
			: value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
	},
	validate: value => {
		const phonePattern = /^\(\d{2}\) \d{4,5}-\d{4}$/;
		return phonePattern.test(value);
	},
	removeFormat: value => {
		return value.replace(/\D/g, "");
	},
};

phoneUtils.elem.addEventListener("input", e => {
	e.target.value = phoneUtils.format(e.target.value);
});

const cepUtils = {
	elem: document.getElementById("zip"),
	format: value => {
		return value
			.replace(/\D/g, "")
			.slice(0, 8)
			.replace(/(\d{5})(\d)/, "$1-$2")
			.replace(/(-\d{3})\d+?$/, "$1");
	},
	validate: value => {
		const cepPattern = /^\d{5}-\d{3}$/;
		return cepPattern.test(value);
	},
	removeFormat: value => {
		return value.replace(/\D/g, "");
	},
};

cepUtils.elem.addEventListener("input", async e => {
	e.target.value = cepUtils.format(e.target.value);
	if (!cepUtils.validate(e.target.value)) return resetAddressCamps();
	const data = await searchCep(cepUtils.removeFormat(e.target.value));
	if (typeof data === "object") {
		setAddressCamps(data);
	}
});

const countryUtils = {
	elem: document.getElementById("country"),
	format: value => {
		return value.trim();
	},
	validate: value => {
		return value.length > 3;
	},
};

const stateUtils = {
	elem: document.getElementById("state"),
	format: value => {
		return value.trim();
	},
	validate: value => {
		return value.length === 2;
	},
};

const cityUtils = {
	elem: document.getElementById("city"),
	format: value => {
		return value.trim();
	},
	validate: value => {
		return value.length > 3;
	},
};

const addressUtils = {
	elem: document.getElementById("address"),
	format: value => {
		return value.trim();
	},
	validate: value => {
		return value.length > 3;
	},
};

const registerButton = document.getElementById("register-button");
registerButton.addEventListener("click", () => {
	if (validateAll()) {
		alert("Success");
	}
});

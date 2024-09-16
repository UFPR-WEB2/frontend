function formatCPF(value) {
	value = value.replace(/\D/g, "").slice(0, 11);
	return value
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d)/, "$1.$2")
		.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function formatPhone(value) {
    value = value.replace(/\D/g, "").slice(0, 11);
    return value
        .replace(/(\d{2})(\d)/, "($1) $2")
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{4})\d+?$/, "$1");
}

function formatCEP(value) {
    value = value.replace(/\D/g, "").slice(0, 8);
    return value
        .replace(/(\d{5})(\d)/, "$1-$2")
        .replace(/(-\d{3})\d+?$/, "$1");
}

const cpf = document.getElementById("cpf");
cpf.addEventListener("input", e => {
	e.target.value = formatCPF(e.target.value);
});

const phone = document.getElementById("phone");
phone.addEventListener("input", e => {
	e.target.value = formatPhone(e.target.value);
});

const city = document.getElementById("city");
const address = document.getElementById("address");
const state = document.getElementById("state");
const country = document.getElementById("country");

const cep = document.getElementById("zip");
cep.addEventListener("input", e => {
	e.target.value = formatCEP(e.target.value);
    
});

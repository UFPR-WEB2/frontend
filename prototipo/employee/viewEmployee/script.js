$(document).ready(function () {
	const $employeeName = $("#employee-name");
	const $employeeDate = $("#employee-date");
	const $employeeEmail = $("#employee-email");
	const $employeePassword = $("#employee-password");

	const $addEmployeeButton = $("#add-employee");
	const $employeeList = $("#employee");
	const $editModal = $("#edit-modal");

	const $editEmployeeName = $("#edit-employee-name");
	const $editEmployeeDate = $("#edit-employee-date");
	const $editEmployeeEmail = $("#edit-employee-email");
	const $editEmployeePassword = $("#edit-employee-password");

	const $saveEditButton = $("#save-edit");
	const $closeButton = $(".close-button");

	let employees = [
		{
			name: "Maria",
			date: "2005-01-11",
			email: "maria@gmail.com",
			password: "1234",
		},
		{
			name: "Mario",
			date: "2004-03-14",
			email: "mario@gmail.com",
			password: "1234",
		},
	];
	let currentEditIndex = null;

	function renderEmployees() {
		$employeeList.empty();
		employees.forEach((employee, index) => {
			const $li = $("<li>").addClass("employee-item");

			const $spanName = $("<span>").text(employee.name);
			const $spanDate = $("<span>").text(employee.date);
			const $spanEmail = $("<span>").text(employee.email);

			const $span = $("<span>").append($spanName, $spanDate, $spanEmail);

			const $div = $("<div>");

			const $editButton = $("<button>").text("Editar");
			$editButton.on("click", () => openEditModal(index));

			const $deleteButton = $("<button>").text("Excluir");
			$deleteButton.on("click", () => deleteEmployee(index));

			$div.append($editButton, $deleteButton);
			$li.append($span, $div);
			$employeeList.append($li);
		});
	}

	function addEmployee() {
		const newEmployee = {
			name: $employeeName.val().trim(),
			date: $employeeDate.val(),
			email: $employeeEmail.val().trim(),
			password: $employeePassword.val().trim(),
		};

		if (validateEmployee(newEmployee)) {
			employees.push(newEmployee);
			$employeeName.val("");
			$employeeDate.val("");
			$employeeEmail.val("");
			$employeePassword.val("");
		}

		renderEmployees();
	}

	function openEditModal(index) {
		currentEditIndex = index;
		const employee = employees[index];

		$editEmployeeName.val(employee.name);
		$editEmployeeDate.val(employee.date);
		$editEmployeeEmail.val(employee.email);
		$editEmployeePassword.val(employee.password);

		$editModal.show();
		$editEmployeeName.focus();
	}

	function closeEditModal() {
		$editModal.hide();
	}

	function saveEdit() {
		const employee = {
			name: $editEmployeeName.val().trim(),
			date: $editEmployeeDate.val(),
			email: $editEmployeeEmail.val().trim(),
			password: $editEmployeePassword.val().trim(),
		};

		if (validateEmployee(employee, true)) {
			employees[currentEditIndex] = employee;

			renderEmployees();
			closeEditModal();
		}
	}

	function deleteEmployee(index) {
		if (employees.length === 1) {
			return alert("Não é possível excluir o último funcionário.");
		}
		employees.splice(index, 1);
		renderEmployees();
	}

	$addEmployeeButton.on("click", addEmployee);

	$saveEditButton.on("click", saveEdit);
	$closeButton.on("click", closeEditModal);
	$(window).on("click", e => {
		if ($(e.target).is($editModal)) {
			closeEditModal();
		}
	});

	function validateName(name) {
		if (!name || typeof name !== "string" || name.trim() === "") {
			return false;
		}
		return true;
	}

	function validateEmail(email, isEdit = false) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || !emailRegex.test(email)) {
			return false;
		}

		if (!isEdit) {
			const emailExists = employees.find(
				employee => employee.email === email
			);
			if (emailExists) {
				return false;
			}
		}
		return true;
	}

	function validateDate(date) {
		if (!date) {
			return false;
		}
		return true;
	}

	function validatePassword(password) {
		if (
			!password ||
			typeof password !== "string" ||
			password.length < 4 ||
			!/^\d+$/.test(password)
		) {
			return false;
		}
		return true;
	}

	function validateEmployee(employee, isEdit = false) {
		const { name, email, password, date } = employee;

		const nameValidation = validateName(name);
		if (!nameValidation) {
			alert("Nome inválido");
			return false;
		}

		const emailValidation = validateEmail(email, isEdit);
		if (!emailValidation) {
			alert("Email inválido");
			return false;
		}

		const dateValidation = validateDate(date);
		if (!dateValidation) {
			alert("Data de nascimento inválida");
			return false;
		}

		const passwordValidation = validatePassword(password);
		if (!passwordValidation) {
			alert("Senha inválida");
			return false;
		}

		return true;
	}

	renderEmployees();
});

$(document).ready(function () {
	const $employeeInput = $("#employee-name");
	const $employeeDate = $("#employee-date");
	const $employeeEmail = $("#employee-email");
	const $employeePassword = $("#employee-password");

	const $addEmployeeButton = $("#add-employee");
	const $categoriesList = $("#employee");
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
			date: "11/01/2005",
			email: "maria@gmail.com",
			password: "1234",
		},
		{
			name: "Mario",
			date: "14/03/2004",
			email: "mario@gmail.com",
			password: "1234",
		},
	];
	let currentEditIndex = null;

	function renderEmployees() {
		$categoriesList.empty();
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
			$categoriesList.append($li);
		});
	}

	function addEmployee() {
		const newEmployee = {
			name: $employeeInput.val().trim(),
			date: $employeeDate.val().trim(),
			email: $employeeEmail.val().trim(),
			password: $employeePassword.val().trim(),
		};
		if (newEmployee && validateEmployee(newEmployee)) {
			employees.push(newEmployee);
			$employeeInput.val("");
			renderEmployees();
		}
	}

	function openEditModal(index) {
		currentEditIndex = index;
		$editEmployeeName.val(employees[index].name);
        $editEmployeeDate.val(employees[index].date);
        $editEmployeeEmail.val(employees[index].email);
        $editEmployeePassword.val(employees[index].password);
		$editModal.show();
		$editEmployeeName.focus();
	}

	function closeEditModal() {
		$editModal.hide();
	}

	function saveEdit() {
		const newEmployee = {
			name: $editEmployeeName.val().trim(),
			date: $editEmployeeDate.val().trim(),
			email: $editEmployeeEmail.val().trim(),
			password: $editEmployeePassword.val().trim(),
		};

		if (newEmployee && validateEmployee(newEmployee)) {
			employees[currentEditIndex] = newEmployee;
			renderEmployees();
			closeEditModal();
		}
	}

	function deleteEmployee(index) {
        if(employees.length === 1){
            return alert("Não é possível excluir o último funcionário.");
        }
		employees.splice(index, 1);
		renderEmployees();
	}

	$addEmployeeButton.on("click", addEmployee);

	$employeeInput.on("keypress", e => {
		if (e.key === "Enter") {
			addEmployee();
		}
	});

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
	}

	function validateEmail(email) {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!email || !emailRegex.test(email)) {
			return false;
		}

		const emailExists = employees.find(
			employee => employee.email === email
		);
		if (emailExists) {
			return false;
		}
	}

	function validateDate(date) {
		if (!date || typeof date !== "string" || date.trim() === "") {
			return false;
		}
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
	}

	function validateEmployee(employee) {
		const { name, email, password, birthdayDate } = employee;

		if (
			validateName(name) &&
			validateEmail(email) &&
			validateDate(birthdayDate) &&
			validatePassword(password)
		) {
			return false;
		}

		return true;
	}

	renderEmployees();
});

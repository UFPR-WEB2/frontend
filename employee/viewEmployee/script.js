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

    let categories = [
        { name: "Maria", date: "2005-01-11", email: "maria@gmail.com", password: "1234" },
        { name: "Mario", date: "2004-03-14", email: "mario@gmail.com", password: "1234" }
    ];
    let currentEditIndex = null;

	function renderEmployees() {
		$categoriesList.empty();
		employees.forEach((employee, index) => {
			const $li = $("<li>").addClass("employee-item");

            const formattedDate = new Date(employee.date).toLocaleDateString('pt-BR');

            const $spanName = $("<span>").text(`Nome: ${employee.name}`);
            const $spanDate = $("<span>").text(`Data de Nascimento: ${formattedDate}`);
            const $spanEmail = $("<span>").text(`Email: ${employee.email}`);

            const $infoDiv = $("<div>").append($spanName, "<br>", $spanDate, "<br>", $spanEmail);

            const $div = $("<div>").addClass("buttons");

			const $editButton = $("<button>").text("Editar");
			$editButton.on("click", () => openEditModal(index));

			const $deleteButton = $("<button>").text("Excluir");
			$deleteButton.on("click", () => deleteEmployee(index));

            $div.append($editButton, $deleteButton);
            $li.append($infoDiv, $div);
            $categoriesList.append($li);
        });
    }

    function validateEmail(email) {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    }

    function emailExists(email) {
        return categories.some(employee => employee.email === email);
    }

    function addEmployee() {
        const name = $employeeInput.val().trim();
        const date = $employeeDate.val();
        const email = $employeeEmail.val().trim();
        const password = $employeePassword.val().trim();

        let errorMessage = "";

        if (!name) {
            errorMessage += "O nome é obrigatório.\n";
        }

        if (!email) {
            errorMessage += "O email é obrigatório.\n";
        } else if (!validateEmail(email)) {
            errorMessage += "Formato de email inválido.\n";
        } else if (emailExists(email)) {
            errorMessage += "Este email já está em uso.\n";
        }

        if (!password) {
            errorMessage += "A senha é obrigatória.\n";
        }

        if (!date) {
            errorMessage += "A data de nascimento é obrigatória.\n";
        }

        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        const newEmployee = {
            name: name,
            date: date,
            email: email,
            password: password
        };

        categories.push(newEmployee);

        $employeeInput.val("");
        $employeeDate.val("");
        $employeeEmail.val("");
        $employeePassword.val("");

        renderEmployees();
    }

    function openEditModal(index) {
        currentEditIndex = index;
        const employee = categories[index];

        $editEmployeeInput.val(employee.name);
        $editEmployeeDate.val(employee.date);
        $editEmployeeEmail.val(employee.email);
        $editEmployeePassword.val(employee.password);

        $editModal.show();
        $editEmployeeInput.focus();
    }

    function closeEditModal() {
        $editModal.hide();
    }

    function emailExistsForEdit(email, index) {
        return categories.some((employee, i) => employee.email === email && i !== index);
    }

    function saveEdit() {
        const name = $editEmployeeInput.val().trim();
        const date = $editEmployeeDate.val();
        const email = $editEmployeeEmail.val().trim();
        const password = $editEmployeePassword.val().trim();

        let errorMessage = "";

        if (!name) {
            errorMessage += "O nome é obrigatório.\n";
        }

        if (!email) {
            errorMessage += "O email é obrigatório.\n";
        } else if (!validateEmail(email)) {
            errorMessage += "Formato de email inválido.\n";
        } else if (emailExistsForEdit(email, currentEditIndex)) {
            errorMessage += "Este email já está em uso.\n";
        }

        if (!password) {
            errorMessage += "A senha é obrigatória.\n";
        }

        if (!date) {
            errorMessage += "A data de nascimento é obrigatória.\n";
        }

        if (errorMessage) {
            alert(errorMessage);
            return;
        }

        categories[currentEditIndex] = {
            name: name,
            date: date,
            email: email,
            password: password
        };

        renderEmployees();
        closeEditModal();
    }

	function deleteEmployee(index) {
        if(employees.length === 1){
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

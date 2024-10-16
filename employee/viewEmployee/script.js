$(document).ready(function () {
    const $employeeInput = $("#employee-name");
    const $employeeDate = $("#employee-date");
    const $employeeEmail = $("#employee-email");
    const $employeePassword = $("#employee-password");

    const $addEmployeeButton = $("#add-employee");
    const $categoriesList = $("#employee");
    const $editModal = $("#edit-modal");

    const $editEmployeeInput = $("#edit-employee-name");
    const $editEmployeeDate = $("#edit-employee-date");
    const $editEmployeeEmail = $("#edit-employee-email");
    const $editEmployeePassword = $("#edit-employee-password");

    const $saveEditButton = $("#save-edit");
    const $closeButton = $(".close-button");

    let categories = ["Maria", "Mário"];
    let currentEditIndex = null;

    function renderEmployees() {
        $categoriesList.empty();
        categories.forEach((employee, index) => {
            const $li = $("<li>").addClass("employee-item");

            const $span = $("<span>").text(employee);

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
        const employee = $employeeInput.val().trim();
        if (employee) {
            categories.push(employee);
            $employeeInput.val("");
            renderEmployees();
        }
    }

    function openEditModal(index) {
        currentEditIndex = index;
        $editEmployeeInput.val(categories[index]);
        $editModal.show();
        $editEmployeeInput.focus();
    }

    function closeEditModal() {
        $editModal.hide();
    }

    function saveEdit() {
        const newEmployee = $editEmployeeInput.val().trim();
        if (newEmployee) {
            categories[currentEditIndex] = newEmployee;
            renderEmployees();
            closeEditModal();
        }
    }

    function deleteEmployee(index) {
        categories.splice(index, 1);
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

    renderEmployees();
});
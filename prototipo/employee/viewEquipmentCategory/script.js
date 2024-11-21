$(document).ready(function () {
    const $categoryInput = $("#category-input");
    const $addCategoryButton = $("#add-category");
    const $categoriesList = $("#categories");
    const $editModal = $("#edit-modal");
    const $editCategoryInput = $("#edit-category-input");
    const $saveEditButton = $("#save-edit");
    const $closeButton = $(".close-button");

    let categories = ["Notebook", "Impressora", "Desktop", "Microfone"];
    let currentEditIndex = null;

    function renderCategories() {
        $categoriesList.empty();
        categories.forEach((category, index) => {
            const $li = $("<li>").addClass("category-item");

            const $span = $("<span>").text(category);

            const $div = $("<div>");

            const $editButton = $("<button>").text("Editar");
            $editButton.on("click", () => openEditModal(index));

            const $deleteButton = $("<button>").text("Excluir");
            $deleteButton.on("click", () => deleteCategory(index));

            $div.append($editButton, $deleteButton);
            $li.append($span, $div);
            $categoriesList.append($li);
        });
    }

    function addCategory() {
        const category = $categoryInput.val().trim();
        if (category) {
            categories.push(category);
            $categoryInput.val("");
            renderCategories();
        }
    }

    function openEditModal(index) {
        currentEditIndex = index;
        $editCategoryInput.val(categories[index]);
        $editModal.show();
        $editCategoryInput.focus();
    }

    function closeEditModal() {
        $editModal.hide();
    }

    function saveEdit() {
        const newCategory = $editCategoryInput.val().trim();
        if (newCategory) {
            categories[currentEditIndex] = newCategory;
            renderCategories();
            closeEditModal();
        }
    }

    function deleteCategory(index) {
        categories.splice(index, 1);
        renderCategories();
    }

    $addCategoryButton.on("click", addCategory);

    $categoryInput.on("keypress", e => {
        if (e.key === "Enter") {
            addCategory();
        }
    });

    $saveEditButton.on("click", saveEdit);
    $closeButton.on("click", closeEditModal);
    $(window).on("click", e => {
        if ($(e.target).is($editModal)) {
            closeEditModal();
        }
    });

    renderCategories();
});
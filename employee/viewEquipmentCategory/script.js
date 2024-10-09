const categoryInput = document.getElementById("category-input");
const addCategoryButton = document.getElementById("add-category");
const categoriesList = document.getElementById("categories");
const editModal = document.getElementById("edit-modal");
const editCategoryInput = document.getElementById("edit-category-input");
const saveEditButton = document.getElementById("save-edit");
const closeButton = document.querySelector(".close-button");

let categories = ["Notebook", "Impressora", "Desktop", "Microfone"];
let currentEditIndex = null;

function renderCategories() {
    categoriesList.innerHTML = "";
    categories.forEach((category, index) => {
        const li = document.createElement("li");
        li.className = "category-item";

        const span = document.createElement("span");
        span.textContent = category;

        const div = document.createElement("div");

        const editButton = document.createElement("button");
        editButton.textContent = "Editar";
        editButton.addEventListener("click", () => openEditModal(index));

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Excluir";
        deleteButton.addEventListener("click", () => deleteCategory(index));

        div.appendChild(editButton);
        div.appendChild(deleteButton);

        li.appendChild(span);
        li.appendChild(div);

        categoriesList.appendChild(li);
    });
}

function addCategory() {
    const category = categoryInput.value.trim();
    if (category) {
        categories.push(category);
        categoryInput.value = "";
        renderCategories();
    }
}

function openEditModal(index) {
    currentEditIndex = index;
    editCategoryInput.value = categories[index];
    editModal.style.display = "block";
}

function closeEditModal() {
    editModal.style.display = "none";
}

function saveEdit() {
    const newCategory = editCategoryInput.value.trim();
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

// Evento para adicionar categoria ao clicar no botão
addCategoryButton.addEventListener("click", addCategory);

// Evento para adicionar categoria ao pressionar Enter
categoryInput.addEventListener("keypress", e => {
    if (e.key === "Enter") {
        addCategory();
    }
});

// Eventos para o modal de edição
saveEditButton.addEventListener("click", saveEdit);
closeButton.addEventListener("click", closeEditModal);
window.addEventListener("click", e => {
    if (e.target === editModal) {
        closeEditModal();
    }
});

// Renderiza as categorias iniciais
renderCategories();
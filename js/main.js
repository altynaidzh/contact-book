const btn = document.querySelector(".btn");
const inp = document.querySelector("#name");
const inp2 = document.querySelector("#phone");
const inp3 = document.querySelector("#image");
const list = document.querySelector("#contactList");
let contacts = [];

btn.addEventListener("click", () => {
  if (!inp.value.trim() || !inp2.value.trim()) {
    alert("Fill the fields");
    return;
  }

  const image = inp3.files[0];

  const obj = {
    name: inp.value,
    phone: inp2.value,
    image: image ? URL.createObjectURL(image) : null,
  };
  setItemToStorage(obj);
  render();
  inp.value = "";
  inp2.value = "";
  inp3.value = null;
});

render();

function setItemToStorage(contact) {
  if (!localStorage.getItem("contact-data")) {
    localStorage.setItem("contact-data", "[]");
  }

  const data = JSON.parse(localStorage.getItem("contact-data"));
  data.push(contact);
  localStorage.setItem("contact-data", JSON.stringify(data));
}

function render() {
  const newData = JSON.parse(localStorage.getItem("contact-data"));
  list.innerHTML = "";

  contacts = newData;

  contacts.forEach((contact, index) => {
    const div = document.createElement("div");
    div.className = "contact-card";
    // div.style.background = "aliceblue";

    const img = document.createElement("img");
    if (contact.image) {
      img.src = contact.image;
      div.appendChild(img);
    }

    const name = document.createElement("p");
    name.innerText = "Name: " + contact.name;
    div.appendChild(name);

    const phone = document.createElement("p");
    phone.innerText = "Phone: " + contact.phone;
    div.appendChild(phone);

    const btnDelete = document.createElement("button");
    btnDelete.innerText = "Delete";
    btnDelete.classList.add("delbutton");
    btnDelete.addEventListener("click", () => {
      deleteTask(index);
    });
    div.appendChild(btnDelete);

    const btnEdit = document.createElement("button");
    btnEdit.innerText = "Edit";
    btnEdit.classList.add("delbutton");
    btnEdit.addEventListener("click", () => {
      editTask(index);
    });
    div.appendChild(btnEdit);

    list.appendChild(div);
  });
}

function deleteTask(index) {
  contacts.splice(index, 1);
  localStorage.setItem("contact-data", JSON.stringify(contacts));
  render();
}

const modal = document.querySelector(".main-modal");
const editName = document.querySelector(".inp-edit-name");
const editPhone = document.querySelector(".inp-edit-phone");
const editImage = document.querySelector(".inp-edit-image");
const btnCloser = document.querySelector(".btn-closer");
const btnSave = document.querySelector(".btn-save");

function editTask(index) {
  modal.style.display = "block";
  const editedContact = contacts[index];
  editName.value = editedContact.name;
  editPhone.value = editedContact.phone;
  editImage.value = null;

  editName.setAttribute("data-index", index);
}

btnSave.addEventListener("click", () => {
  const index = parseInt(editName.getAttribute("data-index"));
  const newName = editName.value;
  const newPhone = editPhone.value;
  const newImage = editImage.files[0];

  if (!newName.trim() || !newPhone.trim()) {
    alert("Fill the fields");
    return;
  }

  contacts[index].name = newName;
  contacts[index].phone = newPhone;
  contacts[index].image = newImage ? URL.createObjectURL(newImage) : null;

  localStorage.setItem("contact-data", JSON.stringify(contacts));
  modal.style.display = "none";
  render();
});

btnCloser.addEventListener("click", () => {
  modal.style.display = "none";
});

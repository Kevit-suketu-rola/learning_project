// to be edited
let name = document.getElementById("name");
let tags = document.getElementById("tags");
let phone = document.getElementById("phone");
let email = document.getElementById("email");
let jobTitle = document.getElementById("job-title");
let workspace = document.getElementById("workspace");
let company = document.getElementById("company");
let searchInput = document.getElementById("search");
let searchSelect = document.getElementById("select");

// buttons
let showBtns = document.getElementsByClassName("show-btn");
let showCloseBtn = document.getElementById("close");
let editCloseBtn = document.getElementById("close-edit");
let editBtn = document.getElementById("edit");
let deleteBtn = document.getElementById("delete");
let searchBtn = document.getElementById("search-btn");

let searchForm = document.getElementById("search-form");

// to show data
let data = document.getElementById("data");

// dialogues
let editForm = document.getElementById("edit-form");
let showDialouge = document.getElementById("show-dialogue");
let dialogueContainer = document.getElementById("show-dialogue-container");
let showTable = document.getElementById("show-table");

// request
let request = "POST";

var curr_idx = -1;

// to be edited
if (!localStorage.getItem("entries")) {
  localStorage.setItem("entries", JSON.stringify([]));
}

showData();

//event listeners
editForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  search();
});

async function showData() {
  let res = await fetch(
    "https://6874d57add06792b9c95705b.mockapi.io/api/v1/Contact"
  );

  let entries = await res.json();

  localStorage.setItem("entries", JSON.stringify(entries));

  data.innerHTML = "";

  //   to be edited
  let items = "";

  entries.forEach((item, index) => {
    items += `
      <tr>
        <td>${index + 1}</td>
        <td>${item.Name}</td>
        <td><button onclick="openEntry(${index})" class='show-btn'>Show</button></td>
      </tr>`;
  });

  data.innerHTML = items;
}

function openEntry(i) {
  setIndex(i);

  let entries = JSON.parse(localStorage.getItem("entries"));

  let items = `
                    <tr>
                        <th>Name:</th>
                        <td>${entries[i].Name}</td>
                    </tr>
                    <tr>
                        <th>Tags:</th>
                        <td>${entries[i].Tags}</td>
                    </tr>
                    <tr>
                        <th>Phone:</th>
                        <td>${entries[i].Phone}</td>
                    </tr>
                    <tr>
                        <th>Email:</th>
                        <td>${entries[i].Email}</td>
                    </tr>
                    <tr>
                        <th>Job Title:</th>
                        <td>${entries[i].JobTitle}</td>
                    </tr>
                    <tr>
                        <th>Workspace:</th>
                        <td>${entries[i].Workspace}</td>
                    </tr>
                    <tr>
                        <th>Company:</th>
                        <td>${entries[i].Company}</td>
                    </tr>
                    `;

  showTable.innerHTML = items;

  openShowDialogue();
}

async function deleteEntry() {
  let entries = JSON.parse(localStorage.getItem("entries"));
  let conf = confirm("Permanently Delete: " + entries[curr_idx].name);
  if (!conf) return;

  let id = entries[curr_idx].id;
  console.log(id);

  try {
    let res = await fetch(
      `https://6874d57add06792b9c95705b.mockapi.io/api/v1/Contact/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    let del = await res.json();
    console.log("User deleted:", del);
  } catch (err) {
    console.error("Error deleting user:", err);
  }

  entries.splice(curr_idx, 1);
  localStorage.setItem("entries", JSON.stringify(entries));

  showData();
  resetDialogue();
  setIndex(-1);
}

// illusionary edit
function editEntry() {
  
  let entries = JSON.parse(localStorage.getItem("entries"));

  let nameToEdit = entries[curr_idx].Name;
  let tagsToEdit = entries[curr_idx].Tags;
  let phoneToEdit = entries[curr_idx].Phone;
  let emailToEdit = entries[curr_idx].Email;
  let jobTitleToEdit = entries[curr_idx].JobTitle;
  let workspaceToEdit = entries[curr_idx].Workspace;
  let companyToEdit = entries[curr_idx].Company;

  name.value = nameToEdit;
  tags.value = tagsToEdit;
  phone.value = phoneToEdit;
  email.value = emailToEdit;
  jobTitle.value = jobTitleToEdit;
  workspace.value = workspaceToEdit;
  company.value = companyToEdit;
}

async function updateEntry() {
  let entries = JSON.parse(localStorage.getItem("entries"));

  let newEntry = {
    Name: name.value,
    Tags: tags.value,
    Phone: phone.value,
    Email: email.value,
    JobTitle: jobTitle.value,
    Workspace: workspace.value,
    Company: company.value,
  };

  try {
    let res = await fetch(
      `https://6874d57add06792b9c95705b.mockapi.io/api/v1/Contact/${
        request == "PUT" ? entries[curr_idx].id : ""
      }`,
      {
        method: `${request}`,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newEntry),
      }
    );
    console.log("perfect");

    let updated = await res.json();
    console.log("User updated:", updated);
    if (curr_idx !== -1) entries.splice(curr_idx, 1);
  } catch (err) {
    console.error("Error updating user:", err);
  }

  entries.push(newEntry);

  localStorage.setItem("entries", JSON.stringify(entries));

  showData();
  resetDialogue();
  setIndex(-1);
}

function search() {
  let entries = JSON.parse(localStorage.getItem("entries"));

  const field = searchSelect.value;
  const query = searchInput.value.trim();

  data.innerHTML = `
      `;
  let items = ``;

  const filtered = entries.filter((entry) => {
    return entry[field].includes(query);
  });

  for (let i = 0; i < entries.length; i++) {
    if (filtered.indexOf(entries[i]) !== -1) {
      items += `
      <tr>
        <td>${i + 1}</td>
        <td>${entries[i].name}</td>
        <td><button onclick="openEntry(${i})" class='show-btn'>Show</button></td>
      </tr>`;
    }
  }

  data.innerHTML = items;
}

//index setter
function setIndex(i) {
  curr_idx = i;
}

//main-toggle functions
function openShowDialogue() {
  toggleContainer();
  toggleShow();
}

function openEditDialouge() {
  request = "PUT";
  toggleShow();
  toggleForm();
  editEntry();
}

function openAddDialogue() {
  request = "POST";
  console.log("here");

  toggleContainer();
  toggleForm();
}

function resetDialogue() {
  // adding hidden
  editForm.classList.add("hidden");
  dialogueContainer.classList.add("hidden");
  showDialouge.classList.add("hidden");

  // removing flex
  editForm.classList.remove("flex");
  dialogueContainer.classList.remove("flex");
  showDialouge.classList.remove("flex");
}

//sub-toggle functions
function toggleForm() {
  name.value =
    email.value =
    phone.value =
    tags.value =
    jobTitle.value =
    workspace.value =
    company.value =
      "";

  if (editForm.classList.contains("flex")) {
    editForm.classList.remove("flex");
  } else {
    editForm.classList.add("flex");
  }
}

function toggleContainer() {
  if (dialogueContainer.classList.contains("hidden")) {
    dialogueContainer.classList.remove("hidden");
  } else {
    dialogueContainer.classList.add("hidden");
  }
}
function toggleShow() {
  if (showDialouge.classList.contains("flex")) {
    showDialouge.classList.remove("flex");
  } else {
    showDialouge.classList.add("flex");
  }
}

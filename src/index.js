document.addEventListener("DOMContentLoaded", () => {
  // your code here
  let form = document.querySelector('form');
  form.addEventListener('submit', e => {
    e.preventDefault();
    buildTask(e.target["new-task-description"].value);
    form.reset();
  })
});

// Build Dropdown List
let dropdown = document.createElement('select');
dropdown.setAttribute('id', 'dropdown-list');
dropdown.name = "Priority";
dropdown.required = true;
let defaultDropdown = document.createElement('option');
defaultDropdown.value = "";
defaultDropdown.disabled = true;
defaultDropdown.defaultSelected = true;
defaultDropdown.hidden = 'hidden';
defaultDropdown.textContent = 'Select priority'
dropdown.append(defaultDropdown);
let priorities = ["high", "medium", "low"];
for (element of priorities) {
  let opt = document.createElement('option');
  opt.value = element;
  opt.textContent = element;
  dropdown.append(opt);
}
let textInput = document.querySelector('#new-task-description');
textInput.after(dropdown)

// Build todo list
function buildTask(task) {
  let p = document.createElement('li');
  let btn = document.createElement('button');
  btn.addEventListener('click', e => e.target.parentNode.remove());
  btn.textContent = 'X';
  p.textContent = `${task} `;
  let list = document.querySelector("#tasks");
  if (document.querySelector('#dropdown-list').value === "high") {
    p.style = "color: red";
    p.className = "high";
    list.insertBefore(p, list.firstChild);
  } else if (document.querySelector('#dropdown-list').value === "medium") {
    p.style = "color: yellow";
    let highPriorityItems = document.querySelectorAll('li.high');
    if (highPriorityItems.length > 0) {
      list.insertBefore(p, highPriorityItems[highPriorityItems.length - 1].nextSibling);
    } else {
      list.appendChild(p);
    }
  } else if (document.querySelector('#dropdown-list').value === "low") {
    p.style = "color: green";
    list.appendChild(p)
  };
  p.appendChild(btn);
}

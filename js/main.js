var siteName = document.getElementById("bookmarkName");
var siteURL = document.getElementById("bookmarkURL");
var submitBtn = document.getElementById("submitBtn");
var tableContent = document.getElementById("tableContent");
var closeBtn = document.getElementById("closeBtn");
var boxModal = document.querySelector(".box-info");
var bookmarks = [];

if (localStorage.getItem("bookmarksList")) {
  bookmarks = JSON.parse(localStorage.getItem("bookmarksList"));
  for (var i = 0; i < bookmarks.length; i++) {
    displayBookmark(i);
  }
}

function displayBookmark(i) {
  tableContent.innerHTML += `
     <tr>
              <td>${i + 1}</td>
              <td>${bookmarks[i].siteName}</td>
              <td>
                <button onClick="visitWebsite(${i})"  class="btn btn-visit">
                  <i class="fa-solid fa-eye pe-2"></i>Visit
                </button>
              </td>
              <td>
                <button  onClick="deleteBookmark(${i})" class="btn btn-delete pe-2">
                  <i class="fa-solid fa-trash-can"></i>
                  Delete
                </button>
              </td>
            </tr>
    `;
}

/*==========add new item=============*/
submitBtn.addEventListener("click", function () {
  if (
    siteName.classList.contains("is-valid") &&
    siteURL.classList.contains("is-valid")
  ) {
    var bookmark = {
      siteName: capitalize(siteName.value),
      siteURL: siteURL.value,
    };
    bookmarks.push(bookmark);
    localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
    displayBookmark(bookmarks.length - 1);
    console.log(bookmarks);
    clearInput();
    siteName.classList.remove("is-valid");
    siteURL.classList.remove("is-valid");
  } else {
    boxModal.classList.remove("d-none");
  }
});

/*========clear inputs========*/
function clearInput() {
  siteName.value = "";
  siteURL.value = "";
}

/*===========make the website name capitalize=======*/

function capitalize(str) {
  let strArr = str.split("");
  strArr[0] = strArr[0].toUpperCase();
  return strArr.join("");
}

/*===========delet item=======*/
function deleteBookmark(i) {
  tableContent.innerHTML = "";
  bookmarks.splice(i, 1);
  for (var j = 0; j < bookmarks.length; j++) {
    displayBookmark(j);
  }
  localStorage.setItem("bookmarksList", JSON.stringify(bookmarks));
}
/*=======visite the website=========*/
function visitWebsite(i) {
  var httpsRegex = /^https?:\/\//;
  if (httpsRegex.test(bookmarks[i].siteURL)) {
    open(bookmarks[i].siteURL);
  } else {
    open(`https://${bookmarks[i].siteURL}`);
  }
}

//======== how to close the model => close button -  Esc key - clicking outside modal============

closeBtn.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key == "Escape") {
    closeModal();
  }
});

document.addEventListener("click", function (e) {
  if (e.target.classList.contains("box-info")) {
    closeModal();
  }
});

function closeModal() {
  boxModal.classList.add("d-none");
}
/*===============validate==========*/
var nameRegex = /^\w{3,}(\s+\w+)*$/;
var urlRegex =
  /^(https?:\/\/)?(w{3}\.)?\w+\.\w{2,}\/?(:\d{2,5})?(\/\w+)*(\.com|\.net)$/;

siteName.addEventListener("input", function () {
  validate(siteName, nameRegex);
});

siteURL.addEventListener("input", function () {
  validate(siteURL, urlRegex);
});

function validate(element, regex) {
  var testRegex = regex;
  if (testRegex.test(element.value)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
  }
}

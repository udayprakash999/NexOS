const adminInfoBtn = document.getElementById("adminInfoBtn");
const adminPopup = document.getElementById("adminPopup");
const closePopup = document.getElementById("closePopup");
const openNotesBtn = document.getElementById("openNotesBtn");
const notesPopup = document.getElementById("notesPopup");
const closeNotes = document.getElementById("closeNotes");
const saveNoteBtn = document.getElementById("saveNoteBtn");
const updateNoteBtn = document.getElementById("updateNoteBtn");
const deleteNoteBtn = document.getElementById("deleteNoteBtn");
const notesArea = document.getElementById("notesArea");
const notesList = document.getElementById("notesList");
const viewSavedNotesBtn = document.getElementById("viewSavedNotesBtn");
const savedNotesPopup = document.getElementById("savedNotesPopup");
const closeSavedNotes = document.getElementById("closeSavedNotes");

const openCalculatorBtn = document.getElementById("openCalculatorBtn");
const calculatorPopup = document.getElementById("calculatorPopup");
const closeCalculator = document.getElementById("closeCalculator");
const calculatorDisplay = document.getElementById("calculatorDisplay");

adminInfoBtn.addEventListener("click", () => {
  adminPopup.style.display = "block";
});

closePopup.addEventListener("click", () => {
  adminPopup.style.display = "none";
});

openNotesBtn.addEventListener("click", () => {
  notesPopup.style.display = "block";
  resetNoteForm();
});

closeNotes.addEventListener("click", () => {
  notesPopup.style.display = "none";
});

viewSavedNotesBtn.addEventListener("click", () => {
  savedNotesPopup.style.display = "block";
  displaySavedNotes();
});

closeSavedNotes.addEventListener("click", () => {
  savedNotesPopup.style.display = "none";
});

openCalculatorBtn.addEventListener("click", () => {
  calculatorPopup.style.display = "block";
});

closeCalculator.addEventListener("click", () => {
  calculatorPopup.style.display = "none";
});

saveNoteBtn.addEventListener("click", () => {
  const noteContent = notesArea.value.trim();
  if (noteContent !== "") {
    const noteId = new Date().toISOString();
    localStorage.setItem(noteId, noteContent);
    alert("Note saved!");
    resetNoteForm();
    displaySavedNotes();
  } else {
    alert("Please write something before saving.");
  }
});

updateNoteBtn.addEventListener("click", () => {
  const updatedContent = notesArea.value.trim();
  if (updatedContent !== "") {
    localStorage.setItem(currentNoteId, updatedContent);
    alert("Note updated!");
    resetNoteForm();
    displaySavedNotes();
  } else {
    alert("Please write something before updating.");
  }
});

deleteNoteBtn.addEventListener("click", () => {
  if (currentNoteId) {
    localStorage.removeItem(currentNoteId);
    alert("Note deleted!");
    resetNoteForm();
    displaySavedNotes();
  } else {
    alert("No note to delete.");
  }
});

function appendNumber(number) {
  calculatorDisplay.value += number;
}

function appendOperator(operator) {
  calculatorDisplay.value += operator;
}

function clearDisplay() {
  calculatorDisplay.value = "";
}

function calculateResult() {
  try {
    calculatorDisplay.value = eval(calculatorDisplay.value);
  } catch (e) {
    calculatorDisplay.value = "Error";
  }
}

function displaySavedNotes() {
  const notes = Object.keys(localStorage);
  notesList.innerHTML = "";

  notes.forEach((noteId) => {
    const noteContent = localStorage.getItem(noteId);
    const noteItem = document.createElement("li");
    noteItem.innerHTML = `
            <span>${noteContent.substring(0, 30)}...</span>
            <div>
                <button onclick="editNote('${noteId}')">Edit</button>
                <button onclick="deleteSavedNote('${noteId}')">Delete</button>
            </div>
        `;
    notesList.appendChild(noteItem);
  });
}

function editNote(noteId) {
  currentNoteId = noteId;
  notesArea.value = localStorage.getItem(noteId);
  saveNoteBtn.style.display = "none";
  updateNoteBtn.style.display = "block";
  deleteNoteBtn.style.display = "block";
  notesPopup.style.display = "block";
}

function deleteSavedNote(noteId) {
  localStorage.removeItem(noteId);
  displaySavedNotes();
}

function resetNoteForm() {
  notesArea.value = "";
  updateNoteBtn.style.display = "none";
  deleteNoteBtn.style.display = "none";
  saveNoteBtn.style.display = "block";
  currentNoteId = null;
}


function makeDraggable(popup) {
  const header = popup.querySelector(".popup-header");
  let offsetX, offsetY;

  header.addEventListener("mousedown", (e) => {
    offsetX = e.clientX - popup.getBoundingClientRect().left;
    offsetY = e.clientY - popup.getBoundingClientRect().top;

    function onDragMove(e) {
      popup.style.left = e.clientX - offsetX + "px";
      popup.style.top = e.clientY - offsetY + "px";
    }

    function stopDrag() {
      document.removeEventListener("mousemove", onDragMove);
      document.removeEventListener("mouseup", stopDrag);
    }

    document.addEventListener("mousemove", onDragMove);
    document.addEventListener("mouseup", stopDrag);
  });
}

makeDraggable(adminPopup);
makeDraggable(notesPopup);
makeDraggable(savedNotesPopup);
makeDraggable(calculatorPopup);

let clockInterval;

function updateTime() {
  const dateTimeElement = document.getElementById("currentDateTime");
  const currentDate = new Date();
  dateTimeElement.textContent = currentDate.toLocaleString();
}

document.getElementById("openClockBtn").addEventListener("click", () => {
  document.getElementById("clockPopup").style.display = "block";
  makeDraggable(document.getElementById("clockPopup"));
});

document.getElementById("closeClock").addEventListener("click", () => {
  document.getElementById("clockPopup").style.display = "none";
});

document.getElementById("setClockBtn").addEventListener("click", () => {
  const dateTime = document.getElementById("clockInput").value;
  if (dateTime) {
    const formattedTime = new Date(dateTime).toLocaleString();
    document.getElementById("currentDateTime").textContent = formattedTime;
  }
  document.getElementById("clockPopup").style.display = "none";
});

function makeDraggable(element) {
  const header = element.querySelector(".popup-header");
  let offsetX, offsetY;

  header.addEventListener("mousedown", (e) => {
    offsetX = e.clientX - element.getBoundingClientRect().left;
    offsetY = e.clientY - element.getBoundingClientRect().top;

    function onMouseMove(e) {
      element.style.left = `${e.clientX - offsetX}px`;
      element.style.top = `${e.clientY - offsetY}px`;
    }

    document.addEventListener("mousemove", onMouseMove);

    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
    });
  });
}

clockInterval = setInterval(updateTime, 1000);

document.getElementById("closePopup").addEventListener("click", () => {
  document.getElementById("adminPopup").style.display = "none";
});

document.getElementById("closeNotes").addEventListener("click", () => {
  document.getElementById("notesPopup").style.display = "none";
});

document.getElementById("closeSavedNotes").addEventListener("click", () => {
  document.getElementById("savedNotesPopup").style.display = "none";
});

document.getElementById("closeCalculator").addEventListener("click", () => {
  document.getElementById("calculatorPopup").style.display = "none";
});

document.addEventListener("DOMContentLoaded", () => {
  const openPhotosBtn = document.getElementById("openPhotosBtn");
  const photosPopup = document.getElementById("photosPopup");
  const closePhotos = document.getElementById("closePhotos");
  const photoUpload = document.getElementById("photoUpload");
  const photosGallery = document.getElementById("photosGallery");

  const photoViewerPopup = document.getElementById("photoViewerPopup");
  const photoViewerImage = document.getElementById("photoViewerImage");
  const closePhotoViewer = document.getElementById("closePhotoViewer");

  const loadPhotos = () => {
    const photos = JSON.parse(localStorage.getItem("photos")) || [];
    photos.forEach((photoSrc) => addPhotoToGallery(photoSrc));
  };

  const savePhotosToLocalStorage = () => {
    const photoElements = Array.from(photosGallery.querySelectorAll("img"));
    const photoSrcs = photoElements.map((img) => img.src);
    localStorage.setItem("photos", JSON.stringify(photoSrcs));
  };

  const addPhotoToGallery = (photoSrc) => {
    const photoContainer = document.createElement("div");
    photoContainer.classList.add("photo-container");

    const img = document.createElement("img");
    img.src = photoSrc;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "X";
    deleteBtn.classList.add("delete-photo-btn");

    deleteBtn.addEventListener("click", (event) => {
      event.stopPropagation();
      photoContainer.remove();
      savePhotosToLocalStorage();
    });

    img.addEventListener("click", () => {
      photoViewerImage.src = photoSrc;
      photoViewerPopup.style.display = "block";
    });

    photoContainer.appendChild(img);
    photoContainer.appendChild(deleteBtn);
    photosGallery.appendChild(photoContainer);
  };

  photoUpload.addEventListener("change", (event) => {
    const files = Array.from(event.target.files);
    files.forEach((file) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        addPhotoToGallery(e.target.result);
        savePhotosToLocalStorage();
      };
      reader.readAsDataURL(file);
    });
    photoUpload.value = ""; 
  });

  openPhotosBtn?.addEventListener("click", () => {
    photosPopup.style.display = "block";
  });

  closePhotos.addEventListener("click", () => {
    photosPopup.style.display = "none";
  });

  closePhotoViewer.addEventListener("click", () => {
    photoViewerPopup.style.display = "none";
  });

  const makeDraggable = (element) => {
    const header = element.querySelector(".popup-header");
    let offsetX = 0,
      offsetY = 0,
      isDragging = false;

    header.addEventListener("mousedown", (e) => {
      offsetX = e.clientX - element.offsetLeft;
      offsetY = e.clientY - element.offsetTop;
      isDragging = true;
    });

    document.addEventListener("mousemove", (e) => {
      if (isDragging) {
        element.style.left = `${e.clientX - offsetX}px`;
        element.style.top = `${e.clientY - offsetY}px`;
      }
    });

    document.addEventListener("mouseup", () => {
      isDragging = false;
    });
  };

  makeDraggable(photosPopup);
  makeDraggable(photoViewerPopup);

  loadPhotos();
});

function makeDraggable(popup) {
  const header = popup.querySelector(".popup-header");
  let offsetX = 0,
    offsetY = 0,
    isDragging = false;

  header.addEventListener("mousedown", (e) => {
    isDragging = true;
    offsetX = e.clientX - popup.offsetLeft;
    offsetY = e.clientY - popup.offsetTop;
  });

  document.addEventListener("mousemove", (e) => {
    if (isDragging) {
      popup.style.left = `${e.clientX - offsetX}px`;
      popup.style.top = `${e.clientY - offsetY}px`;
    }
  });

  document.addEventListener("mouseup", () => {
    isDragging = false;
  });
}

document.addEventListener("DOMContentLoaded", () => {
  const openDocsBtn = document.getElementById("openDocsBtn");
  const docsPopup = document.getElementById("docsPopup");
  const closeDocs = document.getElementById("closeDocs");
  const docsArea = document.getElementById("docsArea");
  const saveDocBtn = document.getElementById("saveDocBtn");
  const deleteDocBtn = document.getElementById("deleteDocBtn");
  const docsList = document.getElementById("docsList");

  let selectedDocKey = null;

  const loadDocs = () => {
    const docs = JSON.parse(localStorage.getItem("docs")) || {};
    docsList.innerHTML = "";
    for (const [key, content] of Object.entries(docs)) {
      const li = document.createElement("li");
      li.textContent = key;
      li.addEventListener("click", () => loadDocContent(key, content));
      docsList.appendChild(li);
    }
  };

  const saveDoc = () => {
    const docContent = docsArea.value.trim();
    if (!docContent) return alert("Document content cannot be empty!");
    const docKey = selectedDocKey || `Document ${new Date().toLocaleString()}`;
    const docs = JSON.parse(localStorage.getItem("docs")) || {};
    docs[docKey] = docContent;
    localStorage.setItem("docs", JSON.stringify(docs));
    selectedDocKey = null;
    docsArea.value = "";
    deleteDocBtn.style.display = "none";
    loadDocs();
    alert("Document saved!");
  };

  const loadDocContent = (key, content) => {
    selectedDocKey = key;
    docsArea.value = content;
    deleteDocBtn.style.display = "block";
  };

  const deleteDoc = () => {
    if (!selectedDocKey) return;
    const docs = JSON.parse(localStorage.getItem("docs")) || {};
    delete docs[selectedDocKey];
    localStorage.setItem("docs", JSON.stringify(docs));
    selectedDocKey = null;
    docsArea.value = "";
    deleteDocBtn.style.display = "none";
    loadDocs();
    alert("Document deleted!");
  };

  openDocsBtn.addEventListener("click", () => {
    docsPopup.style.display = "block";
    loadDocs();
  });

  closeDocs.addEventListener("click", () => {
    docsPopup.style.display = "none";
  });

  saveDocBtn.addEventListener("click", saveDoc);

  deleteDocBtn.addEventListener("click", deleteDoc);

  makeDraggable(docsPopup);
});

const settingsPopup = document.getElementById("settingsPopup");
const openSettingsBtn = document.getElementById("openSettingsBtn");
const closeSettings = document.getElementById("closeSettings");

const fontSelector = document.getElementById("fontSelector");
const backgroundColorPicker = document.getElementById("backgroundColorPicker");
const adminButtonColorPicker = document.getElementById(
  "adminButtonColorPicker"
);

const applySettingsBtn = document.getElementById("applySettingsBtn");
const resetSettingsBtn = document.getElementById("resetSettingsBtn");

const adminInfoBtn2 = document.getElementById("adminInfoBtn");
const body = document.body;

openSettingsBtn.addEventListener("click", () => {
  settingsPopup.style.display = "block";
});
closeSettings.addEventListener("click", () => {
  settingsPopup.style.display = "none";
});

applySettingsBtn.addEventListener("click", () => {
  const selectedFont = fontSelector.value;
  body.style.fontFamily = selectedFont;

  const selectedBackgroundColor = backgroundColorPicker.value;
  body.style.backgroundColor = selectedBackgroundColor;

  const selectedButtonColor = adminButtonColorPicker.value;
  adminInfoBtn.style.backgroundColor = selectedButtonColor;

  settingsPopup.style.display = "none"; 
});

resetSettingsBtn.addEventListener("click", () => {
  body.style.fontFamily = "Arial, sans-serif";

  body.style.backgroundColor = "#ffffff";

  adminInfoBtn.style.backgroundColor = "#007bff";

  settingsPopup.style.display = "none"; 
});

// Function to clear localStorage and refresh webpage
function clearLocalStorage() {
  localStorage.clear();
  window.location.reload(false);
}

// Function to clear the home screen buttons
function clearBtn() {
  for (let i = 0; i < 3; i++) {
    allBtn[i].style.display = "none";
  }
}

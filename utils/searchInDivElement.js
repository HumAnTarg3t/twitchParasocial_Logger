function searchInDivElement() {
  const activeTab = document.querySelector(".tabLinks .active").innerHTML;
  const divElement = document.querySelector(`#${activeTab}.tab`);
  const userInput = document.getElementById("searchInput").value.trim().toLowerCase();

  const elementsToSearch = divElement.querySelectorAll("*");
  let lastFoundElement = null;

  elementsToSearch.forEach((element) => {
    const textContent = element.textContent.toLowerCase();
    const regex = new RegExp(`(?<![\\w!@#$%^&*()-+=?.,])[${userInput}]+(?![\\w!@#$%^&*()-+=?.,])`, "gi");
    const isMatch = userInput !== "" && regex.test(textContent);

    element.style.backgroundColor = isMatch ? "brown" : "";

    if (isMatch) {
      lastFoundElement = element;
    }
  });

  if (lastFoundElement) {
    lastFoundElement.scrollIntoView({ behavior: "smooth", block: "center" });
  }
}

export { searchInDivElement };

function searchInDivElement(input, commandFromClient) {
  const activeTab = document.querySelector(".tabLinks .active").innerHTML;
  const divElement = document.querySelector(`#${activeTab}.tab`);
  // const userInput = document.getElementById("searchInput").value.trim().toLowerCase();
  const userInput = input;
  const elementsToSearch = divElement.querySelectorAll("*");
  if (commandFromClient == "Search") {
    elementsToSearch.forEach((element) => {
      const paragraphPlacement = element;
      const msgInnerHTML = element.innerHTML.toLocaleLowerCase();
      let paragraphInnerHTMLArrayFormat = msgInnerHTML.split(" ");

      if (paragraphPlacement.className == "normalFrogIdCSS" || paragraphPlacement.className == "streamerIdCSS") {
        paragraphInnerHTMLArrayFormat[0] = paragraphInnerHTMLArrayFormat[0].slice(0, -1);
      }

      if (paragraphInnerHTMLArrayFormat.includes(userInput)) {
        paragraphPlacement.style.backgroundColor = "brown";
        element.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    });
  } else if (commandFromClient == "Clear") {
    elementsToSearch.forEach((element) => {
      // const paragraphPlacement = element;
      element.style.backgroundColor = "";
      // const msgInnerHTML = element.innerHTML.toLocaleLowerCase();
    });
  }
}

export { searchInDivElement };

function showTab(index) {
  const tabs = document.querySelectorAll(".tab");
  const tabLinks = document.querySelectorAll(".tabLinks button");

  tabs.forEach((tab) => (tab.style.display = "none"));
  tabLinks.forEach((link) => link.classList.remove("active"));
  tabs[index].style.display = "block";
  tabLinks[index].classList.add("active");

  const documentHeight = Math.max(
    document.body.scrollHeight,
    document.body.offsetHeight,
    document.documentElement.clientHeight,
    document.documentElement.scrollHeight,
    document.documentElement.offsetHeight
  );

  // Get the button with the class "active" inside the div with the class "tabLinks"
  const activeTab = document.querySelector(".tabLinks .active");

  // Check if an active button was found
  if (activeTab) {
    // Get the inner text of the active button
    const buttonText = activeTab.innerText;
    document.title = `${buttonText}s chat`;
  } else {
    // console.log('No button with class "active" found.');
  }

  window.scrollTo({
    top: documentHeight,
  });
}

export { showTab };

function deleteMessages(div, numofMessages) {
  try {
    // Get all paragraphs into an HTMLCollection
    const paragraphs = div.getElementsByTagName("p");
    const numOfParaToDelete = 4;
    const numOfMSGToDelete = numOfParaToDelete * (numofMessages / 2);

    // Convert HTMLCollection to an array
    const paragraphArray = Array.from(paragraphs);
    // console.log(paragraphArray[0]);

    // Get the number of paragraphs
    const numParagraphs = paragraphArray.length;
    // console.log(numParagraphs);

    if (numParagraphs > numofMessages * numOfParaToDelete) {
      for (let index = 0; index < numOfMSGToDelete; index++) {
        div.removeChild(paragraphArray[index]);
      }
    }
  } catch (error) {
    console.log("prob not enough to del");
    console.log(error);
  }
}

export { deleteMessages };

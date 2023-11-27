const shuffleObject = (obj) => {
  // Shuffle the object
  const keys = Object.keys(obj);
  for (let i = keys.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [keys[i], keys[j]] = [keys[j], keys[i]];
  }
  const shuffledObject = {};
  keys.forEach((key) => {
    shuffledObject[key] = obj[key];
  });
  return shuffledObject;
};

const titleCase = (str) => {
  // Convert string to titlecase
  return str
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

const getRandomColor = () => {
  // Generate a random color code
  const getRandomComponent = () => Math.floor(Math.random() * 156) + 100;
  let red, green, blue;
  do {
    red = getRandomComponent();
    green = getRandomComponent();
    blue = getRandomComponent();
  } while (red < 50 && green < 50 && blue < 50);
  return `rgb(${red}, ${green}, ${blue})`;
};

const getRandomFontSize = (min, max) => {
  // Generate a random font size
  return Math.floor(Math.random() * (max - 2 + 1) + min) + "px";
};

const reloadOnWidthChange = () => {
  // Get the initial width
  let currentWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
  // Add event listener for screen width change
  window.addEventListener("resize", function () {
    // Check if the width has changed
    if (window.innerWidth !== currentWidth || document.documentElement.clientWidth !== currentWidth || document.body.clientWidth !== currentWidth) {
      // Reload the page
      location.reload();
    }
  });
};

fetch("links.json")
  .then((response) => {
    // Check if the response is OK
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return response.json(); // Convert the response to JSON
  })
  .then((data) => {
    const linksData = shuffleObject(data); // Shuffle the object
    const dataLength = Object.keys(data).length; // Get the length of the object
    const linksContainer = document.getElementById("profile_links"); // Get the links container
    linksContainer.style.maxWidth = `${dataLength * 100}px`; // Set the max width of the container
    const htmlContent = Object.entries(linksData) // Convert the object to an array
      // Generate the HTML content
      .map(([name, url]) => {
        let screenWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth; // Get the screen width
        let minFontSize = screenWidth < 600 ? 18 : screenWidth < 1000 ? 20 : 25; // Set the minimum font size
        let maxFontSize = screenWidth < 600 ? 20 : screenWidth < 1000 ? 30 : 35; // Set the maximum font size
        const randomColor = getRandomColor(); // Get a random color
        const randomFontSize = getRandomFontSize(minFontSize, maxFontSize); // Get a random font size
        const css = `style="color: ${randomColor};font-size: ${randomFontSize};"`; // Generate the CSS
        return `<a href="${url}" target="_blank" ${css}">${titleCase(name)}.</a>`; // Generate the HTML
      })
      .join("");
    // Set the HTML content in the container
    linksContainer.innerHTML = htmlContent;
  })
  .catch((error) => {
    // Catch any errors and log them to the console
    console.error("Error fetching the JSON file:", error);
  });

// Call the function when the page loads
window.onload = reloadOnWidthChange;
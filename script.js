document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput");
  const wishButton = document.getElementById("wishButton");
  const nameInputSection = document.getElementById("name-input-section");
  const wishSection = document.getElementById("wish-section");
  const birthdayTitle = document.getElementById("birthday-title");
  const birthdayMessage = document.getElementById("birthday-message");
  const resetBtn = document.getElementById("resetBtn");
  const confettiContainer = document.getElementById("confetti-container");
  const backgroundUpload = document.getElementById("backgroundUpload");
  const filenameDisplay = document.getElementById("filename");

  let uploadedBackgroundImage = null;

  // Focus on name input when page loads
  nameInput.focus();

  // Allow pressing Enter to submit
  nameInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
          wishButton.click();
      }
  });

  // Update filename display on file selection
  backgroundUpload.addEventListener("change", () => {
      if (backgroundUpload.files.length > 0) {
          filenameDisplay.textContent = backgroundUpload.files[0].name;
          const reader = new FileReader();
          reader.onload = (e) => {
              uploadedBackgroundImage = e.target.result;
          };
          reader.readAsDataURL(backgroundUpload.files[0]);
      } else {
          filenameDisplay.textContent = "No file chosen";
          uploadedBackgroundImage = null;
      }
  });

  // Main wish button functionality
  wishButton.addEventListener("click", () => {
      const name = nameInput.value;
      if (name.trim() === "") {
          alert("Please enter your name!");
          return;
      }

      const wishes = [
          `...May your day be filled with joy😃and laughter😁!`,
          `..Wishing you a year filled with happiness😆😆and success,!`,
          `May all your dreams🤙🤙come true on your special day,!`,
          `Sending you warm wishes🎉and a day as bright as your smile☺️☺️,!`,
          `Happy birthday🎂🎂, ${name}! May this year bring you endless blessings✨✨.`,
      ];

      birthdayTitle.textContent = `Happy Birthday🎂✌️, ${name}!`;
      birthdayMessage.innerHTML = wishes.join("<br><br>");

      nameInputSection.style.display = "none";
      wishSection.style.display = "block";

      // Change background to uploaded image if available
      if (uploadedBackgroundImage) {
          document.body.style.backgroundImage = `url('${uploadedBackgroundImage}')`;
      } else {
          // Optionally set a default background for the second page if no image is uploaded
          document.body.style.backgroundImage = "none";
          document.body.style.backgroundColor = "#f0f0f0"; // Or any default color
      }
      document.body.style.backgroundSize = "cover";

      // Create confetti effect
      createConfetti();
  });

  // Reset button functionality
  resetBtn.addEventListener("click", () => {
      nameInput.value = "";
      wishSection.style.display = "none";
      nameInputSection.style.display = "block";
      document.body.style.backgroundImage = "url('HD-landscape-photographs-51.jpg')";
      document.body.style.backgroundSize = "cover";
      document.body.style.backgroundColor = ""; // Remove any default color
      filenameDisplay.textContent = "No file chosen";
      uploadedBackgroundImage = null;

      // Focus on name input
      nameInput.focus();
  });

  // Confetti creation function
  function createConfetti() {
      const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"];

      // Clear any existing confetti
      confettiContainer.innerHTML = "";

      // Create 100 confetti pieces
      for (let i = 0; i < 100; i++) {
          const confetti = document.createElement("div");
          confetti.className = "confetti";

          // Random styling
          confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
          confetti.style.left = Math.random() * 100 + "vw";
          confetti.style.width = Math.random() * 10 + 5 + "px";
          confetti.style.height = Math.random() * 10 + 5 + "px";
          confetti.style.opacity = Math.random() * 0.5 + 0.5;

          // Random animation duration
          const duration = Math.random() * 3 + 2;
          confetti.style.animationDuration = duration + "s";

          // Add to container
          confettiContainer.appendChild(confetti);

          // Remove after animation completes
          setTimeout(() => {
              confetti.remove();
          }, duration * 1000);
      }
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const nameInput = document.getElementById("nameInput")
  const wishButton = document.getElementById("wishButton")
  const nameInputSection = document.getElementById("name-input-section")
  const wishSection = document.getElementById("wish-section")
  const birthdayTitle = document.getElementById("birthday-title")
  const birthdayMessage = document.getElementById("birthday-message")
  const resetBtn = document.getElementById("resetBtn")
  const playMusicBtn = document.getElementById("playMusicBtn")
  const shareBtn = document.getElementById("shareBtn")
  const birthdaySong = document.getElementById("birthdaySong")
  const confettiContainer = document.getElementById("confetti-container")

  // Focus on name input when page loads
  nameInput.focus()

  // Allow pressing Enter to submit
  nameInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      wishButton.click()
    }
  })

  // Main wish button functionality
  wishButton.addEventListener("click", () => {
    const name = nameInput.value
    if (name.trim() === "") {
      alert("Please enter your name!")
      return
    }

    const wishes = [
      `May your day be filled with joy and laughter, ${name}!`,
      `Wishing you a year filled with happiness and success, ${name}!`,
      `May all your dreams come true on your special day, ${name}!`,
      `Sending you warm wishes and a day as bright as your smile, ${name}!`,
      `Happy birthday, ${name}! May this year bring you endless blessings.`,
    ]

    birthdayTitle.textContent = `Happy Birthday, ${name}!`
    birthdayMessage.innerHTML = wishes.join("<br><br>")

    nameInputSection.style.display = "none"
    wishSection.style.display = "block"

    // Change background to birthday image
    document.body.style.backgroundImage = "url('Happy-Birthday-Best-Image.jpg')"

    // Create confetti effect
    createConfetti()
  })

  // Reset button functionality
  resetBtn.addEventListener("click", () => {
    nameInput.value = ""
    wishSection.style.display = "none"
    nameInputSection.style.display = "block"
    document.body.style.backgroundImage = "url('HD-landscape-photographs-51.jpg')"

    // Stop music if playing
    birthdaySong.pause()
    birthdaySong.currentTime = 0
    playMusicBtn.textContent = "Play Birthday Song"

    // Focus on name input
    nameInput.focus()
  })

  // Music button functionality
  playMusicBtn.addEventListener("click", () => {
    if (birthdaySong.paused) {
      birthdaySong
        .play()
        .then(() => {
          playMusicBtn.textContent = "Pause Music"
        })
        .catch((error) => {
          console.error("Error playing audio:", error)
          alert("Unable to play music. Please try again.")
        })
    } else {
      birthdaySong.pause()
      playMusicBtn.textContent = "Play Birthday Song"
    }
  })

  // Share button functionality
  shareBtn.addEventListener("click", () => {
    const name = nameInput.value
    const shareText = `I just received beautiful birthday wishes! Check out this birthday wishes page!`

    if (navigator.share) {
      navigator
        .share({
          title: "Birthday Wishes",
          text: shareText,
          url: window.location.href,
        })
        .catch((error) => {
          console.error("Error sharing:", error)
          fallbackShare(shareText)
        })
    } else {
      fallbackShare(shareText)
    }
  })

  // Fallback sharing method
  function fallbackShare(text) {
    // Create a temporary input to copy the text
    const input = document.createElement("textarea")
    input.value = text
    document.body.appendChild(input)
    input.select()
    document.execCommand("copy")
    document.body.removeChild(input)
    alert("Share text copied to clipboard!")
  }

  // Confetti creation function
  function createConfetti() {
    const colors = ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#ff00ff", "#00ffff"]

    // Clear any existing confetti
    confettiContainer.innerHTML = ""

    // Create 100 confetti pieces
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement("div")
      confetti.className = "confetti"

      // Random styling
      confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]
      confetti.style.left = Math.random() * 100 + "vw"
      confetti.style.width = Math.random() * 10 + 5 + "px"
      confetti.style.height = Math.random() * 10 + 5 + "px"
      confetti.style.opacity = Math.random() * 0.5 + 0.5

      // Random animation duration
      const duration = Math.random() * 3 + 2
      confetti.style.animationDuration = duration + "s"

      // Add to container
      confettiContainer.appendChild(confetti)

      // Remove after animation completes
      setTimeout(() => {
        confetti.remove()
      }, duration * 1000)
    }
  }
})


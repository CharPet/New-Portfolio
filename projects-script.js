// ===============================
// Project1: Video Overlay & Dynamic Content
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  // Dynamic content replacement in .project1 .right
  const rightContent = document.getElementById("right-content");
  if (rightContent) {
    document.querySelectorAll(".grid-item[data-content]").forEach((item) => {
      item.addEventListener("click", function () {
        const key = this.getAttribute("data-content");
        const contentMap = {
          persona: `<embed src="../pdf/Βιογραφικό Σημείωμα + Περιγραφή της Πρακτικής Άσκησης.pdf" type="application/pdf" width="100%" height="100%" style="border:none;">`,
          sitemap: `<embed src="../pdf/design.pdf" type="application/pdf" width="100%" height="100%" style="border:none;">`,
          userflow: `<img src="../images/path1.svg" alt="User Flow" style="width:100%;height:auto;display:block;">`,
          taskflow: `<img src="../images/taskflow.png" alt="Task Flow" style="width:100%;height:auto;display:block;">`,
        };

        // Fade out
        rightContent.classList.add("fading");
        setTimeout(() => {
          rightContent.innerHTML = contentMap[key] || "";
          // Fade in
          rightContent.classList.remove("fading");
        }, 400); // Match the CSS transition duration
      });
    });
  }

  // Video overlay functionality
  const previewBtn = document.getElementById("preview-btn");
  const videoOverlay = document.getElementById("video-overlay");
  const previewVideo = document.getElementById("preview-video");
  const closeVideoBtn = document.getElementById("close-video");

  if (previewBtn && videoOverlay && previewVideo && closeVideoBtn) {
    previewBtn.addEventListener("click", function () {
      videoOverlay.style.display = "flex";
      previewVideo.currentTime = 0;
      previewVideo.play();
    });

    closeVideoBtn.addEventListener("click", function () {
      videoOverlay.style.display = "none";
      previewVideo.pause();
    });
  }
});

function debugLog(message) {
  console.log(message);
  const debugDiv = document.getElementById("debug-info");
  if (debugDiv) {
    debugDiv.innerHTML = "Debug: " + message;
  }
}

document.addEventListener("DOMContentLoaded", function () {
  debugLog("DOM Content Loaded");

  // Dynamic content replacement in .project1 .right
  const rightContent = document.getElementById("right-content");
  debugLog("Right content element: " + (rightContent ? "Found" : "Not found"));

  if (rightContent) {
    const dataButtons = document.querySelectorAll(".grid-item[data-content]");
    debugLog("Found " + dataButtons.length + " data-content buttons");

    dataButtons.forEach((item, index) => {
      item.addEventListener("click", function () {
        const key = this.getAttribute("data-content");
        debugLog("Clicked button with data-content: " + key);

        const contentMap = {
          persona: `<div style="padding: 20px; text-align: center;">
                                <h3>Περσόνα Χρήστη</h3>
                                <p>This would normally load a PDF file.<br>
                                Original path: ../pdf/Βιογραφικό - Πέτρος Χαραλαμπίδης.pdf</p>
                                <div style="background: #f0f0f0; padding: 20px; margin: 20px 0; border-radius: 8px;">
                                    <strong>User Persona Content</strong><br>
                                    Age: 25-35<br>
                                    Tech-savvy professional<br>
                                    Values: Efficiency, modern design
                                </div>
                            </div>`,
          sitemap: `<div style="padding: 20px; text-align: center;">
                                <h3>Sitemap</h3>
                                <p>This would normally load a PDF file.<br>
                                Original path: ../pdf/design.pdf</p>
                                <div style="background: #f0f0f0; padding: 20px; margin: 20px 0; border-radius: 8px;">
                                    <strong>Site Structure</strong><br>
                                    Home → About → Services → Contact<br>
                                    Blog → Portfolio → Resources
                                </div>
                            </div>`,
          userflow: `<div style="padding: 20px; text-align: center;">
                                <h3>User Flow</h3>
                                <p>This would normally load an SVG file.<br>
                                Original path: ../images/path1.svg</p>
                                <div style="background: #e3f2fd; padding: 20px; margin: 20px 0; border-radius: 8px;">
                                    <strong>User Journey</strong><br>
                                    Landing → Browse → Select → Purchase → Confirmation
                                </div>
                            </div>`,
          taskflow: `<div style="padding: 20px; text-align: center;">
                                <h3>Task Flow</h3>
                                <p>This would normally load a PNG file.<br>
                                Original path: ../images/taskflow.png</p>
                                <div style="background: #f3e5f5; padding: 20px; margin: 20px 0; border-radius: 8px;">
                                    <strong>Task Sequence</strong><br>
                                    Start → Input → Process → Validate → Complete
                                </div>
                            </div>`,
        };

        // Fade out
        rightContent.classList.add("fading");
        setTimeout(() => {
          rightContent.innerHTML =
            contentMap[key] ||
            `<div style="padding: 20px; text-align: center;"><h3>Content not found</h3><p>Key: ${key}</p></div>`;
          // Fade in
          rightContent.classList.remove("fading");
          debugLog("Content updated for: " + key);
        }, 400);
      });
    });
  }

  // Video overlay functionality
  const previewBtn = document.getElementById("preview-btn");
  const videoOverlay = document.getElementById("video-overlay");
  const previewVideo = document.getElementById("preview-video");
  const closeVideoBtn = document.getElementById("close-video");

  debugLog(
    "Video elements - Btn: " +
      (previewBtn ? "Found" : "Missing") +
      ", Overlay: " +
      (videoOverlay ? "Found" : "Missing") +
      ", Video: " +
      (previewVideo ? "Found" : "Missing") +
      ", Close: " +
      (closeVideoBtn ? "Found" : "Missing")
  );

  if (previewBtn && videoOverlay && previewVideo && closeVideoBtn) {
    previewBtn.addEventListener("click", function () {
      debugLog("Preview button clicked - showing video overlay");
      videoOverlay.style.display = "flex";
      previewVideo.currentTime = 0;
      previewVideo.play().catch((e) => {
        debugLog("Video play error: " + e.message);
      });
    });

    closeVideoBtn.addEventListener("click", function () {
      debugLog("Close button clicked - hiding video overlay");
      videoOverlay.style.display = "none";
      previewVideo.pause();
    });

    // Close on overlay background click
    videoOverlay.addEventListener("click", function (e) {
      if (e.target === videoOverlay) {
        debugLog("Overlay background clicked - closing video");
        videoOverlay.style.display = "none";
        previewVideo.pause();
      }
    });
  } else {
    debugLog("Video functionality not initialized - missing elements");
  }
});

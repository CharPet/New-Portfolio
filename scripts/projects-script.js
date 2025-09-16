// ===============================
// Project1: Video Overlay & Dynamic Content
// ===============================

document.addEventListener("DOMContentLoaded", function () {
  const previewBtn = document.getElementById("preview-btn");
  const videoOverlay = document.getElementById("video-overlay");
  const closeVideoBtn = document.getElementById("close-video");
  const video = document.getElementById("preview-video");
  const rightContent = document.getElementById("right-content");
  const defaultContent = rightContent.innerHTML;

  // --- Handle all buttons with data-url attributes ---
  const urlButtons = document.querySelectorAll(".grid-item[data-url]");
  console.log("Found URL buttons:", urlButtons.length); // Debug

  urlButtons.forEach((button, index) => {
    console.log(`Button ${index}:`, button.dataset.url); // Debug

    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const url = this.dataset.url;
      const buttonId = this.id;

      console.log("Button clicked:", buttonId, "URL:", url); // Debug

      // Don't do anything for disabled buttons or empty URLs
      if (this.disabled || !url || url === "#") {
        console.log("Button is disabled or has no URL");
        return;
      }

      // Handle different button types
      if (buttonId === "preview-btn") {
        // For preview button, you can either open the video or show in overlay
        // Currently opening YouTube link in new tab
        window.open(url, "_blank");
      } else {
        // For other buttons (GitHub, Figma), open in new tab
        window.open(url, "_blank");
      }
    });
  });

  // --- PDF Loading Logic ---
  const pdfButtons = document.querySelectorAll(".grid-item[data-content]");
  console.log("Found PDF buttons:", pdfButtons.length); // Debug

  pdfButtons.forEach((button, index) => {
    console.log(`PDF Button ${index}:`, button.dataset.content); // Debug

    button.addEventListener("click", function (e) {
      e.preventDefault();
      e.stopPropagation();

      const pdfPath = this.dataset.content;
      console.log("Clicked PDF button:", pdfPath); // Debug

      if (pdfPath && pdfPath.toLowerCase().endsWith(".pdf")) {
        // Show loading message
        rightContent.innerHTML = `
          <div style="display:flex; align-items:center; justify-content:center; height:100%; text-align:center; background:#f5f5f5;">
            <p style="font-size:1.2rem;">Loading PDF...</p>
          </div>
        `;

        // Try iframe approach
        setTimeout(() => {
          rightContent.innerHTML = `
            <div style="width:100%; height:100%; background:#f5f5f5; display:flex; flex-direction:column;">
              <div style="background:#333; color:white; padding:10px; text-align:center; font-size:0.9rem;">
                ${pdfPath.split("/").pop()} | 
                <a href="${pdfPath}" target="_blank" style="color:#4CAF50; text-decoration:none;">Open in New Tab</a>
              </div>
              <iframe 
                src="${pdfPath}" 
                style="width:100%; height:calc(100% - 40px); border:none; background:white;"
                onload="console.log('PDF iframe loaded')"
                onerror="console.log('PDF iframe failed')">
                <div style="padding:2rem; text-align:center;">
                  <p>Unable to display PDF inline.</p>
                  <a href="${pdfPath}" target="_blank" style="background:#212529; color:white; padding:0.5rem 1rem; text-decoration:none; border-radius:4px;">
                    Open PDF in New Tab
                  </a>
                </div>
              </iframe>
            </div>
          `;
        }, 500);
      }
    });
  });

  // --- Video Overlay Logic (if you decide to use it later) ---
  if (closeVideoBtn) {
    closeVideoBtn.addEventListener("click", function () {
      if (videoOverlay) {
        videoOverlay.style.display = "none";
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }

  if (videoOverlay) {
    videoOverlay.addEventListener("click", function (e) {
      if (e.target === videoOverlay) {
        videoOverlay.style.display = "none";
        if (video) {
          video.pause();
          video.currentTime = 0;
        }
      }
    });
  }
});

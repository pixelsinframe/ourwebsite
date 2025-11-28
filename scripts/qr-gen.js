const input = document.getElementById("qrCodeInput");
const button = document.getElementById("qrCodeGenerate");
const qrCodeContainer = document.getElementById("qrCodeContainer");
const downloadBtn = document.getElementById("downloadBtn");
const errorMessage = document.getElementById("errorMessage");

const loadingIndicator = document.createElement("div");
loadingIndicator.id = "loadingIndicator";
loadingIndicator.style.display = "none";
loadingIndicator.textContent = "Generating QR Code...";
qrCodeContainer.appendChild(loadingIndicator);

const qrCode = new QRCodeStyling({
  width: 280,
  height: 280,
  dotsOptions: {
    color: "#ff4500",
    type: "rounded",
  },
  backgroundOptions: {
    color: "#ffffff",
  },
});

button.addEventListener("click", () => {
  if (input.value.trim() === "") {
    errorMessage.style.display = "block";
    return;
  }
  errorMessage.style.display = "none";
  loadingIndicator.style.display = "block";
  qrCodeContainer.innerHTML = ""; // Clear previous QR code
  qrCodeContainer.appendChild(loadingIndicator);

  const data = input.value;
  if (!isValidURL(data)) {
    showErrorMessage("Invalid URL");
    return;
  }

  qrCode.update({
    data: data,
  });
  qrCode.append(qrCodeContainer);

  qrCode
    .getRawData("png")
    .then((blob) => {
      loadingIndicator.style.display = "none";
      const url = URL.createObjectURL(blob);
      downloadBtn.href = url;
      downloadBtn.style.display = "inline";
    })
    .catch((err) => {
      console.error(err);
      showErrorMessage("Failed to generate QR Code");
    });
});

function isValidURL(string) {
  try {
    new URL(string);
    return true;
  } catch (_) {
    return false;
  }
}

function showErrorMessage(message) {
  errorMessage.textContent = message;
  errorMessage.style.display = "block";
}

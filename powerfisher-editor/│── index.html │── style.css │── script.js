<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>PowerFisher Photo Editor</title>
  <link rel="stylesheet" href="style.css">
</head>
<body>

<h1>PowerFisher Photo Editor</h1>

<input type="file" id="upload" accept="image/*">

<div class="editor">
  <canvas id="canvas"></canvas>
</div>

<div class="controls">
  <label>Brightness</label>
  <input type="range" id="brightness" min="0" max="200" value="100">

  <label>Contrast</label>
  <input type="range" id="contrast" min="0" max="200" value="100">

  <label>Saturation</label>
  <input type="range" id="saturation" min="0" max="200" value="100">

  <label>Sharpness</label>
  <input type="range" id="sharpness" min="0" max="10" value="0">
</div>

<button onclick="resetImage()">Reset</button>
<button onclick="downloadImage()">Download</button>

<script src="script.js"></script>
</body>
</html>
body {
  font-family: Arial, sans-serif;
  text-align: center;
  background: #111;
  color: white;
}

.editor {
  margin: 20px auto;
  max-width: 90%;
}

canvas {
  max-width: 100%;
  border-radius: 12px;
}

.controls {
  display: grid;
  gap: 10px;
  max-width: 400px;
  margin: auto;
}

input[type=range] {
  width: 100%;
}

button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
  background: #00ffcc;
  font-weight: bold;
  cursor: pointer;
}
const upload = document.getElementById("upload");
const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");

let img = new Image();

upload.addEventListener("change", () => {
  const file = upload.files[0];
  const reader = new FileReader();
  reader.onload = () => {
    img.src = reader.result;
  };
  reader.readAsDataURL(file);
});

img.onload = () => {
  canvas.width = img.width;
  canvas.height = img.height;
  applyFilters();
};

const controls = document.querySelectorAll(".controls input");
controls.forEach(control => {
  control.addEventListener("input", applyFilters);
});

function applyFilters() {
  ctx.filter = `
    brightness(${brightness.value}%)
    contrast(${contrast.value}%)
    saturate(${saturation.value}%)
  `;
  ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
}

function resetImage() {
  brightness.value = 100;
  contrast.value = 100;
  saturation.value = 100;
  applyFilters();
}

function downloadImage() {
  const link = document.createElement("a");
  link.download = "powerfisher_edit.png";
  link.href = canvas.toDataURL();
  link.click();
}

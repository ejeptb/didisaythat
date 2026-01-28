async function analyze() {
  const text = document.getElementById("text").value;
  const personality = document.getElementById("personality").value;
  const resultDiv = document.getElementById("result");

  if (!text) {
    resultDiv.innerHTML = "<p class='warning'>Please enter some text.</p>";
    return;
  }

  resultDiv.innerHTML = "<p>Processing… ⏳</p>";

  try {
    const res = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, personality })
    });

    const data = await res.json();

    if (data.error) {
      resultDiv.innerHTML = `<p class='warning'>Error: ${data.error}</p>`;
      return;
    }

    const endings = ["😅", "🤔", "💀", "🔥", "🙃", "😳", "💖", "😎"];
    let resultText = data.result + " " + endings[Math.floor(Math.random() * endings.length)];

    resultDiv.innerHTML = `
      <button class="copy-btn" onclick="copyResult()">Copy</button>
      <p>${resultText}</p>
    `;

    resultDiv.dataset.latest = resultText;

  } catch (err) {
    resultDiv.innerHTML = "<p class='warning'>Error: Could not reach AI.</p>";
    console.error(err);
  }
}

function copyResult() {
  const resultDiv = document.getElementById("result");
  const textToCopy = resultDiv.dataset.latest;
  if (!textToCopy) return;
  navigator.clipboard.writeText(textToCopy).then(() => {
    alert("Copied to clipboard!");
  });
}

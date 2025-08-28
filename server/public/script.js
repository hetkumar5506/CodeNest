const editor = CodeMirror.fromTextArea(document.getElementById("editor"), {
  lineNumbers: true,
  mode: "javascript",
  theme: "monokai"
});

const defaultSnippets = {
  javascript: `// JavaScript Example
function greet(name) {
  return "Hello " + name;
}
console.log(greet("Het"));`,

  htmlmixed: `<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: sans-serif; background: #121212; color: #00ffc3; }
    h1 { font-size: 2rem; }
  </style>
</head>
<body>
  <h1>Hello from CodeNest</h1>
  <script>
    console.log("JS is working!");
  </script>
</body>
</html>`,

  python: `# Python Example
name = input("Enter your name: ")
print("Hello", name)`,

  java: `public class Main {
  public static void main(String[] args) {
    java.util.Scanner sc = new java.util.Scanner(System.in);
    String name = sc.nextLine();
    System.out.println("Hello " + name);
  }
}`,

  nodejs: `const readline = require('readline');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

rl.question("Enter your name: ", name => {
  console.log("Hello", name);
  rl.close();
});`,

  c: `#include <stdio.h>
int main() {
  char name[100];
  scanf("%s", name);
  printf("Hello %s\\n", name);
  return 0;
}`,

  cpp: `#include <iostream>
using namespace std;
int main() {
  string name;
  cin >> name;
  cout << "Hello " << name << endl;
  return 0;
}`,

  go: `package main
import "fmt"
func main() {
  var name string
  fmt.Scanln(&name)
  fmt.Println("Hello", name)
}`
};

editor.setValue(defaultSnippets["javascript"]);

document.getElementById("language").addEventListener("change", (e) => {
  const lang = e.target.value;
  let mode = "javascript";

  switch (lang) {
    case "htmlmixed": mode = "htmlmixed"; break;
    case "python": mode = "python"; break;
    case "java": mode = "text/x-java"; break;
    case "nodejs": mode = "javascript"; break;
    case "c": mode = "text/x-csrc"; break;
    case "cpp": mode = "text/x-c++src"; break;
    case "go": mode = "go"; break;
    default: mode = "javascript";
  }

  editor.setOption("mode", mode);
  editor.setValue(defaultSnippets[lang] || "");
});

function runCode() {
  const lang = document.getElementById("language").value;
  const code = editor.getValue();
  const input = document.getElementById("userInput").value;
  const output = document.getElementById("output");
  const preview = document.getElementById("preview");
  const status = document.getElementById("status");

  output.textContent = "";
  preview.classList.remove("show");
  preview.style.display = "none";
  status.textContent = "Running...";
  status.classList.add("running");

  if (lang === "javascript") {
    const logs = [];
    const originalLog = console.log;
    console.log = (...args) => logs.push(args.join(" "));
    try {
      eval(code);
      output.textContent = logs.join("\n") || "Executed successfully";
    } catch (err) {
      output.textContent = "Error: " + err.message;
    }
    console.log = originalLog;
    status.textContent = "Done";
    status.classList.remove("running");
  } else if (lang === "htmlmixed") {
    const blob = new Blob([code], { type: "text/html" });
    preview.src = URL.createObjectURL(blob);
    preview.classList.add("show");
    preview.style.display = "block";
    status.textContent = "Preview loaded";
    status.classList.remove("running");
  } else {
    fetch("/run", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ language: lang, code, input }),
    })
      .then(res => res.json())
      .then(data => {
        output.textContent = data.output || `Error: ${data.error}`;
        status.textContent = "Done";
        status.classList.remove("running");
      })
      .catch(err => {
        output.textContent = "Server error: " + err.message;
        status.textContent = "Failed";
        status.classList.remove("running");
      });
  }
}

function downloadCode() {
  const code = editor.getValue();
  const lang = document.getElementById("language").value;
  const ext = {
    javascript: "js",
    htmlmixed: "html",
    python: "py",
    java: "java",
    nodejs: "js",
    c: "c",
    cpp: "cpp",
    go: "go"
  }[lang] || "txt";

  const blob = new Blob([code], { type: "text/plain" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = `code.${ext}`;
  link.click();
}

function copyCode() {
  const code = editor.getValue();
  navigator.clipboard.writeText(code)
    .then(() => showToast("Code copied to clipboard"))
    .catch(() => showToast("Failed to copy code"));
}

function toggleTheme() {
  document.body.classList.toggle("light-theme");
  const isLight = document.body.classList.contains("light-theme");
  editor.setOption("theme", isLight ? "default" : "monokai");

  const icon = document.getElementById("themeBtn").querySelector("i");
  icon.className = isLight ? "bi bi-moon" : "bi bi-brightness-high";
}

document.getElementById("fullscreenOverlay").addEventListener("click", openFullscreenPreview);
function openFullscreenPreview() {
  const code = editor.getValue();
  const blob = new Blob([code], { type: "text/html" });
  const url = URL.createObjectURL(blob);
  window.open(url, "_blank");
}

// Optional: Toast feedback (non-blocking)
function showToast(message) {
  const toast = document.createElement("div");
  toast.textContent = message;
  toast.style.position = "fixed";
  toast.style.bottom = "20px";
  toast.style.right = "20px";
  toast.style.background = "var(--accent)";
  toast.style.color = "var(--bg)";
  toast.style.padding = "0.6rem 1rem";
  toast.style.borderRadius = "6px";
  toast.style.fontSize = "0.9rem";
  toast.style.boxShadow = "0 2px 6px rgba(0,0,0,0.3)";
  toast.style.zIndex = "999";
  toast.style.opacity = "0";
  toast.style.transition = "opacity 0.4s ease";

  document.body.appendChild(toast);
  requestAnimationFrame(() => {
    toast.style.opacity = "1";
  });

  setTimeout(() => {
    toast.style.opacity = "0";
    setTimeout(() => toast.remove(), 400);
  }, 2000);
}
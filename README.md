# CodeNest 🧠💻

CodeNest is a developer-first code playground built for clarity, speed, and real-world utility. It supports multi-language execution, live HTML/CSS/JS preview, user input piping, Monokai-powered syntax highlighting, and a premium UI designed for frictionless coding.

---

## 🚀 Features

- ✨ Syntax highlighting with Monokai theme
- 🧠 Multi-language support: JavaScript, Python, C, C++, Java, Go, Node.js, HTML/CSS/JS
- 📦 User input support for stdin-based programs
- 🖥️ Live preview for HTML/CSS/JS with fullscreen toggle
- 📋 Copy, download, and theme toggle buttons
- 🔄 Animated UI with smooth transitions and status feedback
- 🔐 Clean backend execution with temp file cleanup

---

## 🛠️ Tech Stack

- **Frontend**: HTML, CSS, JavaScript, CodeMirror, Bootstrap Icons
- **Backend**: Node.js, Express, child_process, fs
- **Execution**: Local compilation and piping via `exec()`

---

## 📂 Folder Structure

```
├── 📁 .git/ 🚫 (auto-hidden)
├── 📁 assets/
│   └── 🖼️ logo.svg
├── 📁 node_modules/ 🚫 (auto-hidden)
├── 📁 server/
│   ├── 📁 public/
│   │   ├── 🌐 index.html
│   │   ├── 📄 script.js
│   │   └── 🎨 styles.css
│   ├── ☕ Main.class 🚫 (auto-hidden)
│   ├── ☕ Main.java
│   └── 📄 index.js
├── 📁 vendor/ 🚫 (auto-hidden)
├── 🚫 .gitignore
├── 📖 README.md
├── 📄 package-lock.json 🚫 (auto-hidden)
└── 📄 package.json
```
---

## 🧪 Supported Languages

| Language   | Input Support | Output Format |
|------------|----------------|----------------|
| JavaScript | ❌ (in-browser) | Console log |
| HTML/CSS/JS | ❌ | Live preview |
| Python     | ✅ | Console |
| C          | ✅ | Console |
| C++        | ✅ | Console |
| Java       | ✅ | Console |
| Go         | ✅ | Console |
| Node.js    | ✅ | Console |

---

## ⚙️ Setup Instructions

1. Clone the repo  
2. Run `npm install`  
3. Start the server: `node server/index.js`  
4. Open `http://localhost:3000` in your browser

---

## 📌 Roadmap

- [ ] Add MySQL query panel  
- [ ] Theme switcher dropdown  
- [ ] Execution time tracking  
- [ ] Snippet autosave per language  
- [ ] Docker sandboxing for secure execution

---

## 👨‍💻 Built by Het Patel

Build for you with ❤️ — modular, expressive, and ready to run.
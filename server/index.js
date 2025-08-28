const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const { exec } = require("child_process");
const fs = require("fs");
const path = require("path");

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));

// POST /run — Executes code based on language
app.post("/run", (req, res) => {
  const { language, code, input } = req.body;
  if (!language || !code) {
    return res.status(400).json({ error: "Missing language or code" });
  }

  const tempFile = path.join(__dirname, language === "java" ? "Main.java" : `temp.${getExtension(language)}`);
  const exeFile = path.join(__dirname, "temp.out");

  try {
    fs.writeFileSync(tempFile, code);
  } catch (err) {
    return res.status(500).json({ error: "Failed to write temp file" });
  }

  const command = getCommand(language, tempFile, exeFile);
  if (!command) {
    cleanupFiles(tempFile, exeFile, language);
    return res.status(400).json({ error: "Unsupported language" });
  }

  const process = exec(command, (err, stdout, stderr) => {
    cleanupFiles(tempFile, exeFile, language);
    if (err) {
      return res.json({ error: stderr || err.message });
    }
    res.json({ output: stdout });
  });

  if (input) {
    process.stdin.write(input);
    process.stdin.end();
  }
});

// Maps language to file extension
function getExtension(lang) {
  return {
    python: "py",
    c: "c",
    cpp: "cpp",
    java: "java",
    go: "go",
    nodejs: "js"
  }[lang] || "txt";
}

// Maps language to execution command
function getCommand(lang, temp, exe) {
  switch (lang) {
    case "python":
      return `python3 ${temp}`;
    case "c":
      return `gcc ${temp} -o ${exe} && ${exe}`;
    case "cpp":
      return `g++ ${temp} -o ${exe} && ${exe}`;
    case "java":
      return `javac ${temp} && java -cp ${path.dirname(temp)} Main`;
    case "go":
      return `go run ${temp}`;
    case "nodejs":
      return `node ${temp}`;
    default:
      return null;
  }
}

// Cleans up temp files after execution
function cleanupFiles(tempFile, exeFile, language) {
  if (fs.existsSync(tempFile)) fs.unlinkSync(tempFile);
  if (fs.existsSync(exeFile)) fs.unlinkSync(exeFile);
  if (language === "java") {
    const classFile = path.join(__dirname, "Main.class");
    if (fs.existsSync(classFile)) fs.unlinkSync(classFile);
  }
}

// Fallback route
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// Start server
app.listen(PORT, () => {
  console.log(`✅ CodeNest running at http://localhost:${PORT}`);
});
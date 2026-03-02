import { useState, useRef, useEffect, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useShell } from "./ShellContext";
import styles from "./ShellBarStyles.module.css";

const DIRS = {
  about: "/about",
  projects: "/projects",
  photos: "/photography",
};

const DIR_NAMES = Object.keys(DIRS);

const README = `# lsbarro

Second-year Mathematics student at UBC.
Passionate about Tech and Finance.
Building solutions that enhance everyday life.`;

const NEOFETCH_LOGO = `    /\\
   /  \\
  / /\\ \\
 / /  \\ \\
/_/    \\_\\`;

const DELETE_LINES = [
  "removing '/home/lsbarro/readme'",
  "removing '/home/lsbarro/about/'",
  "removing '/home/lsbarro/projects/'",
  "removing '/home/lsbarro/photos/'",
  "removing '/usr/lib/react/index.js'",
  "removing '/usr/lib/react-dom/client.js'",
  "removing '/var/www/lsbarro.dev/index.html'",
  "removing '/var/www/lsbarro.dev/assets/'",
  "removing '/etc/nginx/conf.d/portfolio'",
  "removing '/usr/bin/node'",
  "removing '/boot/vmlinuz'",
  "removing '/'",
  "",
  "Segmentation fault (core dumped)",
];


function ShellBar({ className }) {
  const navigate = useNavigate();
  const location = useLocation();
  const {
    history,
    setHistory,
    commandHistory,
    setCommandHistory,
    destroyPhase,
    setDestroyPhase,
    destroyLines,
    setDestroyLines,
  } = useShell();
  const [input, setInput] = useState("");
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef(null);
  const outputRef = useRef(null);

  // Determine current directory from route
  const currentDir = useCallback(() => {
    const page = Object.entries(DIRS).find(
      ([, path]) => path === location.pathname
    )?.[0];
    return page ? `~/${page}` : "~";
  }, [location.pathname])();

  // Prompt: "lsbarro $" at home, "lsbarro/projects $" at subpages
  const prompt =
    currentDir === "~"
      ? "lsbarro $"
      : `lsbarro/${currentDir.slice(2)} $`;

  // Scroll output to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [history]);

  // Focus input when clicking the shell area
  const focusInput = () => {
    if (inputRef.current) inputRef.current.focus();
  };

  // Resolve a path like a real shell
  const resolvePath = useCallback(
    (target) => {
      if (!target || target === "~" || target === "/") return "~";

      let parts;
      let base;

      if (target.startsWith("~/")) {
        base = [];
        parts = target.slice(2).split("/").filter(Boolean);
      } else if (target.startsWith("/")) {
        base = [];
        parts = target.slice(1).split("/").filter(Boolean);
      } else {
        // Relative to current dir
        base =
          currentDir === "~"
            ? []
            : currentDir.slice(2).split("/").filter(Boolean);
        parts = target.split("/").filter(Boolean);
      }

      for (const part of parts) {
        if (part === "..") {
          base.pop();
        } else if (part !== ".") {
          base.push(part);
        }
      }

      return base.length === 0 ? "~" : `~/${base.join("/")}`;
    },
    [currentDir]
  );

  const addOutput = (cmd, output, isError = false) => {
    setHistory((prev) => [...prev, { prompt, cmd, output, isError }]);
  };

  // ======== Destruction sequence ========
  const startDestruction = () => {
    setDestroyLines([]);
    setDestroyPhase("deleting");
  };

  useEffect(() => {
    if (destroyPhase !== "deleting") return;

    setDestroyLines([]);
    let lineIndex = 0;
    const timer = setInterval(() => {
      if (lineIndex < DELETE_LINES.length) {
        setDestroyLines((prev) => [...prev, DELETE_LINES[lineIndex]]);
        lineIndex++;
      } else {
        clearInterval(timer);
        // After all lines print, go blank
        setTimeout(() => {
          setDestroyLines([]);
          setDestroyPhase("blank");
        }, 400);
      }
    }, 120);

    return () => clearInterval(timer);
  }, [destroyPhase, setDestroyPhase, setDestroyLines]);

  // Check if rm command has -r and -f flags
  const isRmRf = (args) => {
    const flags = args.filter((a) => a.startsWith("-")).join("");
    return flags.includes("r") && flags.includes("f");
  };

  const executeCommand = (raw) => {
    const trimmed = raw.trim();
    if (!trimmed) return;

    setCommandHistory((prev) => [...prev, trimmed]);
    setHistoryIndex(-1);

    const parts = trimmed.split(/\s+/);
    const cmd = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (cmd) {
      case "ls": {
        if (currentDir === "~") {
          const items = [...DIR_NAMES.map((d) => d + "/"), "readme"].sort();
          addOutput(trimmed, items.join("  "));
        } else {
          addOutput(trimmed, "");
        }
        break;
      }

      case "cd": {
        const target = args[0];
        if (!target || target === "~" || target === "/") {
          addOutput(trimmed, "");
          navigate("/");
        } else {
          const resolved = resolvePath(target);
          if (resolved === "~") {
            addOutput(trimmed, "");
            navigate("/");
          } else {
            const page = resolved.replace("~/", "");
            if (DIRS[page]) {
              addOutput(trimmed, "");
              navigate(DIRS[page]);
            } else {
              addOutput(
                trimmed,
                `-bash: cd: ${target}: No such file or directory`,
                true
              );
            }
          }
        }
        break;
      }

      case "pwd":
        addOutput(
          trimmed,
          currentDir === "~"
            ? "/home/lsbarro"
            : `/home/lsbarro/${currentDir.slice(2)}`
        );
        break;

      case "whoami":
        addOutput(trimmed, "lsbarro");
        break;

      case "cat":
        if (
          args[0] === "readme" ||
          args[0] === "README" ||
          args[0] === "readme.md"
        ) {
          if (currentDir === "~") {
            addOutput(trimmed, README);
          } else {
            addOutput(
              trimmed,
              `cat: readme: No such file or directory`,
              true
            );
          }
        } else if (args[0]) {
          addOutput(
            trimmed,
            `cat: ${args[0]}: No such file or directory`,
            true
          );
        } else {
          addOutput(trimmed, "cat: missing operand", true);
        }
        break;

      case "echo":
        addOutput(trimmed, args.join(" ") || "");
        break;

      case "date":
        addOutput(trimmed, new Date().toString());
        break;

      case "history": {
        const all = [...commandHistory, trimmed];
        addOutput(
          trimmed,
          all.map((c, i) => `  ${i + 1}  ${c}`).join("\n")
        );
        break;
      }

      case "clear":
        setHistory([]);
        return;

      case "help":
        addOutput(
          trimmed,
          [
            "ls            list directory contents",
            "cd <dir>      change directory",
            "cat <file>    print file contents",
            "pwd           print working directory",
            "whoami        print current user",
            "echo <text>   print text",
            "date          print current date",
            "uname         print system info",
            "neofetch      system info display",
            "history       command history",
            "clear         clear terminal",
            "exit          return home",
          ].join("\n")
        );
        break;

      case "neofetch": {
        const logoLines = NEOFETCH_LOGO.split("\n");
        const infoLines = [
          "lsbarro@portfolio",
          "------------------",
          "OS:     WebOS 1.0",
          "Host:   lsbarro.dev",
          "Shell:  bash 5.2",
          "Font:   Space Mono",
          "Built:  React + Vite",
          "Uptime: since 2023",
        ];
        const maxLogoWidth = Math.max(...logoLines.map((l) => l.length));
        const combined = [];
        const rows = Math.max(logoLines.length, infoLines.length);
        for (let i = 0; i < rows; i++) {
          const logo = (logoLines[i] || "").padEnd(maxLogoWidth);
          const info = infoLines[i] || "";
          combined.push(`${logo}   ${info}`);
        }
        addOutput(trimmed, combined.join("\n"));
        break;
      }

      case "uname":
        if (args.includes("-a")) {
          addOutput(
            trimmed,
            "WebOS 1.0 lsbarro-portfolio 6.1.0-lsbarro #1 SMP React/Vite aarch64"
          );
        } else {
          addOutput(trimmed, "WebOS");
        }
        break;

      case "exit":
        addOutput(trimmed, "");
        navigate("/");
        break;

      case "cowsay": {
        const msg = args.join(" ") || "moo";
        const border = "-".repeat(msg.length + 2);
        addOutput(
          trimmed,
          ` ${border}\n< ${msg} >\n ${border}\n        \\   ^__^\n         \\  (oo)\\_______\n            (__)\\       )\\/\\\n                ||----w |\n                ||     ||`
        );
        break;
      }

      case "fortune": {
        const fortunes = [
          "You will pet a cat today.",
        ];
        addOutput(
          trimmed,
          fortunes[Math.floor(Math.random() * fortunes.length)]
        );
        break;
      }

      case "ping":
        addOutput(trimmed, "PONG!");
        break;

      case "man":
        if (args[0]) {
          addOutput(
            trimmed,
            `No manual entry for ${args[0]}`,
            true
          );
        } else {
          addOutput(
            trimmed,
            "What manual page do you want?",
            true
          );
        }
        break;

      case "sudo":
        addOutput(trimmed, `${trimmed.slice(5)}: permission denied`, true);
        break;

      case "rm":
        if (isRmRf(args)) {
          addOutput(trimmed, "");
          startDestruction();
        } else if (args.length === 0) {
          addOutput(trimmed, "rm: missing operand", true);
        } else {
          addOutput(trimmed, `rm: cannot remove '${args[args.length - 1]}': permission denied`, true);
        }
        break;

      case "mkdir":
      case "touch":
      case "mv":
      case "cp":
      case "chmod":
        addOutput(trimmed, `${cmd}: permission denied`, true);
        break;

      default:
        addOutput(trimmed, `${cmd}: command not found`, true);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      executeCommand(input);
      setInput("");
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex =
          historyIndex === -1
            ? commandHistory.length - 1
            : Math.max(0, historyIndex - 1);
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      if (historyIndex === -1) return;
      const newIndex = historyIndex + 1;
      if (newIndex >= commandHistory.length) {
        setHistoryIndex(-1);
        setInput("");
      } else {
        setHistoryIndex(newIndex);
        setInput(commandHistory[newIndex]);
      }
    } else if (e.key === "Tab") {
      e.preventDefault();
      const cmdParts = input.split(/\s+/);
      if (cmdParts[0] === "cd" && cmdParts.length === 2) {
        let partial = cmdParts[1];
        let prefix = "";
        if (partial.startsWith("~/")) {
          prefix = "~/";
          partial = partial.slice(2);
        }
        if (currentDir === "~" || prefix === "~/") {
          const clean = partial.replace(/\//g, "").toLowerCase();
          const match = DIR_NAMES.find((d) => d.startsWith(clean));
          if (match) setInput(`cd ${prefix}${match}`);
        }
      } else if (
        cmdParts[0] === "cat" &&
        cmdParts.length === 2 &&
        currentDir === "~"
      ) {
        if ("readme".startsWith(cmdParts[1].toLowerCase())) {
          setInput("cat readme");
        }
      }
    } else if (e.ctrlKey && e.key === "l") {
      e.preventDefault();
      setHistory([]);
    }
  };

  // ⌘K to focus the input
  useEffect(() => {
    const handleGlobalKey = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        if (inputRef.current) inputRef.current.focus();
      }
    };
    window.addEventListener("keydown", handleGlobalKey);
    return () => window.removeEventListener("keydown", handleGlobalKey);
  }, []);

  const hasOutput = history.length > 0;

  const overlayClass = `${styles.destroyOverlay}${destroyPhase === "blank" ? ` ${styles.blank}` : ""}`;

  return (
    <>
      {destroyPhase && (
        <div className={overlayClass}>
          {destroyLines.map((line, i) => (
            <p key={i} className={styles.destroyLine}>
              {line}
            </p>
          ))}
        </div>
      )}
      <div
        className={`${styles.shell}${className ? ` ${className}` : ""}`}
        onClick={focusInput}
      >
        {hasOutput && (
          <div className={styles.outputArea} ref={outputRef}>
            {history.map((entry, i) => (
              <div key={i} className={styles.entry}>
                <div className={styles.commandLine}>
                  <span className={styles.prompt}>{entry.prompt}</span>{" "}
                  {entry.cmd}
                </div>
                {entry.output && (
                  <pre
                    className={
                      entry.isError ? styles.errorOutput : styles.output
                    }
                  >
                    {entry.output}
                  </pre>
                )}
              </div>
            ))}
          </div>
        )}
        <div className={styles.inputLine}>
          <span className={styles.prompt}>{prompt}</span>
          <input
            ref={inputRef}
            type="text"
            className={styles.input}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            spellCheck={false}
            autoComplete="off"
            autoCapitalize="off"
          />
          {hasOutput && (
            <span
              className={styles.hint}
              onClick={(e) => {
                e.stopPropagation();
                setHistory([]);
              }}
            >
              [clear]
            </span>
          )}
        </div>
      </div>
    </>
  );
}

export default ShellBar;

const body = document.body;
const themeToggle = document.querySelector(".theme-toggle");

const safeGet = (key) => {
	try {
		return localStorage.getItem(key);
	} catch {
		return null;
	}
};

const safeSet = (key, value) => {
	try {
		localStorage.setItem(key, value);
	} catch {}
};

const applyTheme = (isDark) => {
	body.classList.toggle("dark-theme", isDark);
	themeToggle.textContent = isDark ? "🌙" : "☀️";
	themeToggle.setAttribute(
		"aria-label",
		isDark ? "Switch to light theme" : "Switch to dark theme",
	);
};

const savedTheme = safeGet("theme");
applyTheme(
	savedTheme
		? savedTheme === "dark"
		: window.matchMedia("(prefers-color-scheme: dark)").matches,
);

themeToggle.addEventListener("click", () => {
	const isDark = !body.classList.contains("dark-theme");
	safeSet("theme", isDark ? "dark" : "light");
	applyTheme(isDark);
});

// Highlight the nav link for the section currently in view
const links = document.querySelectorAll(".nav-links a");
const sections = document.querySelectorAll("main section");

const observer = new IntersectionObserver(
	(entries) => {
		entries.forEach((entry) => {
			if (!entry.isIntersecting) return;
			links.forEach((link) =>
				link.classList.toggle(
					"active",
					link.getAttribute("href") === `#${entry.target.id}`,
				),
			);
		});
	},
	{ rootMargin: "-40% 0px -55% 0px" },
);

sections.forEach((section) => observer.observe(section));

document.getElementById("year").textContent = new Date().getFullYear();

import { type Theme } from "@/utils.ts";
export function changeTheme(): void {
  const theme = getTheme() === "dark" ? "light" : "dark";
  setTheme(theme);
}

export function getTheme(): Theme {
  const theme = localStorage.getItem("theme");
  return theme === "dark" ? "dark" : "light";
}

export function setTheme(theme: Theme): void {
  localStorage.setItem("theme", theme || "light");
}

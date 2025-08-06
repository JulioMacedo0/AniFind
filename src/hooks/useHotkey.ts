import { useEffect } from "react";

export const HOTKEYS = {
  PASTE_IMAGE: "Control+v",
} as const;

type HotkeyName = keyof typeof HOTKEYS;

function parseHotkey(e: KeyboardEvent): string {
  const keys: string[] = [];
  if (e.ctrlKey) keys.push("Control");
  if (e.metaKey) keys.push("Meta");
  if (e.shiftKey) keys.push("Shift");
  if (e.altKey) keys.push("Alt");
  keys.push(e.key);
  return keys.join("+");
}

/**
 * Hook to listen for typed hotkeys
 * @param hotkeyName - Predefined command name
 * @param callback - Function to execute
 */
export function useHotkey(hotkeyName: HotkeyName, callback: () => void): void;
/**
 * Hook to listen for custom hotkeys
 * @param hotkey - Custom combination (e.g., "Control+Shift+x")
 * @param callback - Function to execute
 */

export function useHotkey(
  hotkeyOrName: HotkeyName | string,
  callback: () => void
): void {
  useEffect(() => {
    const hotkey =
      hotkeyOrName in HOTKEYS
        ? HOTKEYS[hotkeyOrName as HotkeyName]
        : hotkeyOrName;

    const listener = (e: KeyboardEvent) => {
      const pressed = parseHotkey(e);
      console.log("Pressed hotkey:", pressed, "Expected:", hotkey);
      if (pressed.toLowerCase() === hotkey.toLowerCase()) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", listener);
    return () => window.removeEventListener("keydown", listener);
  }, [hotkeyOrName, callback]);
}

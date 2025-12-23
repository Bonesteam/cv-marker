"use client";

import { useEffect } from "react";

// Client-side guard to prevent third-party/extension scripts from throwing
// when trying to redefine `window.ethereum`. This wraps Object.defineProperty
// only for the specific case of attempts to redefine `ethereum` on window.
// This is intentionally narrow and logs any ignored errors.
export default function ClientGuards() {
  useEffect(() => {
    const origDefine = Object.defineProperty;

    // small wrapper that ignores redefinitions of `ethereum` on window
    // and catches any throwing attempts to avoid breaking app JS.
    (Object as any).defineProperty = function (obj: any, prop: PropertyKey, descriptor: PropertyDescriptor) {
      try {
        if (prop === "ethereum" && obj === window) {
          const existing = Object.getOwnPropertyDescriptor(window, "ethereum");
          if (existing) {
            // already defined — avoid throwing by skipping redefinition
            console.warn("ClientGuards: ignoring attempt to redefine window.ethereum");
            return window;
          }
        }
        return origDefine(obj, prop, descriptor);
      } catch (e) {
        console.warn("ClientGuards: ignored defineProperty error for", String(prop), e);
        return obj;
      }
    } as any;

    return () => {
      try {
        (Object as any).defineProperty = origDefine;
      } catch (e) {
        /* ignore */
      }
    };
  }, []);

  return null;
}

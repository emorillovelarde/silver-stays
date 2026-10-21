"use client";

import { useState, useEffect } from "react";

export function useIsAtTop(threshold = 20): boolean {
  const [isAtTop, setIsAtTop] = useState(true);

  useEffect(() => {
    const check = () => setIsAtTop(window.scrollY < threshold);

    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, [threshold]);

  return isAtTop;
}

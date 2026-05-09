import { useEffect, useState } from "react";

export function useDeviceCapability() {
  const [isLowEnd, setIsLowEnd] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") {
      return;
    }

    const mobile = /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);
    const lowEnd =
      navigator.hardwareConcurrency <= 2 ||
      (mobile && navigator.hardwareConcurrency <= 4);

    setIsMobile(mobile);
    setIsLowEnd(lowEnd);
  }, []);

  return { isLowEnd, isMobile };
}

import { useEffect, useState } from "react";

export function useDeviceCapability() {
  const [isLowEnd, setIsLowEnd] = useState(false);

  useEffect(() => {
    if (typeof navigator === "undefined") {
      return;
    }

    const lowEnd =
      navigator.hardwareConcurrency <= 4 ||
      /Android|iPhone|iPad|iPod/i.test(navigator.userAgent);

    setIsLowEnd(lowEnd);
  }, []);

  return { isLowEnd };
}

"use client";

import { useEffect } from "react";

const useOnClickOutside = (
  ref: React.RefObject<HTMLElement>,
  handler: () => void,
) => {
  useEffect(() => {
    const listener = (event: MouseEvent | TouchEvent) => {
      // Check if the ref exists and if the click was outside of it
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return; // Click is inside the ref, do nothing
      }

      // If we reach this point, the click is outside
      const acceptPolicyBlock = document.querySelector("#acceptPolicy");
      if (
        acceptPolicyBlock &&
        acceptPolicyBlock.contains(event.target as Node)
      ) {
        return; // Click is inside the acceptPolicy block, do nothing
      }

      // If the click is outside both, call the handler
      handler();
    };

    document.addEventListener("mousedown", listener);
    document.addEventListener("touchstart", listener);

    return () => {
      document.removeEventListener("mousedown", listener);
      document.removeEventListener("touchstart", listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;

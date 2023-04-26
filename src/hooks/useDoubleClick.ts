export function useDoubleClick(callback: (...args: any[]) => void, delay = 300) {
  let lastClickTime = 0;

  return (...args: any[]) => {
    const now = Date.now();
    if (lastClickTime + delay < now) {
      lastClickTime = now;
      return;
    }
    lastClickTime = 0;
    callback(...args);
  };
}

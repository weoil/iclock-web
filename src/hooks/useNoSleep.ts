import noSleep from "nosleep.js";
import { onBeforeMount, onBeforeUnmount } from "vue";

/**
 * Create a hook to enable/disable "no sleep" feature of the browser.
 * @param {boolean} [auto=true] - Whether to enable "no sleep" automatically when mounted.
 * @returns {{enable: function, disable: function}} - Object with enable and disable functions to control "no sleep".
 */
export const useNoSleep = (auto = true) => {
  const ns = new noSleep();
  onBeforeMount(() => {
    auto && ns.enable();
  });
  onBeforeUnmount(() => {
    auto && ns.disable();
  });
  return {
    enable: () => ns.enable(),
    disable: () => ns.disable()
  };
};

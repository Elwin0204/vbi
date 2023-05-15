import now from "./now";

function throttle (func, wait, options) {
  let timeout, ctx, args, result;
  let previous = 0;
  if (!options) options = {};

  const later = function () {
    previous = options.leading === false ? 0 : now();
    timeout = null;
    result = func.apply(ctx, args);
    if (!timeout) ctx = args = null;
  }

  const _throttled = function () {
    const _now = now();
    if (!previous && options.leading === false) previous = _now;
    const remaining = wait - (_now - previous);
    ctx = this;
    args = arguments;
    if (remaining <= 0 || remaining > wait) {
      if (timeout) {
        clearTimeout(timeout);
        timeout = null;
      }
      previous = _now;
      result = func.apply(ctx, args);
      if (!timeout) ctx = args = null;
    } else if (!timeout && options.trailing !== false) {
      timeout = setTimeout(later, remaining);
    }
    return result;
  };

  _throttled.cancel = function () {
    clearTimeout(timeout);
    previous = 0;
    timeout = ctx = args = null;
  };
  return _throttled;
}

export default throttle;
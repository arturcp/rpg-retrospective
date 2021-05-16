/* eslint-disable import/prefer-default-export */
export function triggerKeydown(options) {
  const defaultOptions = {
    altKey: false,
    bubbles: true,
    cancelBubble: false,
    cancelable: true,
    charCode: 0,
    composed: true,
    ctrlKey: false,
    currentTarget: null,
    defaultPrevented: true,
    detail: 0,
    eventPhase: 0,
    isComposing: false,
    isTrusted: true,
    key: '',
    location: 0,
    metaKey: false,
    repeat: false,
    returnValue: false,
    shiftKey: false,
    type: 'keydown',
  };
  const eventOptions = { ...defaultOptions, ...options };
  const ev = new KeyboardEvent('keydown', eventOptions);

  window.dispatchEvent(ev);
}

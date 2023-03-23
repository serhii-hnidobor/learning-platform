const aliases = new Map([
  ['Win', 'Meta'],
  ['Scroll', 'ScrollLock'],
  ['Spacebar', ' '],
  ['Down', 'ArrowDown'],
  ['Left', 'ArrowLeft'],
  ['Right', 'ArrowRight'],
  ['Up', 'ArrowUp'],
  ['Del', 'Delete'],
  ['Crsel', 'CrSel'],
  ['Exsel', 'ExSel'],
  ['Apps', 'ContextMenu'],
  ['Esc', 'Escape'],
  ['Decimal', '.'],
  ['Multiply', '*'],
  ['Add', '+'],
  ['Subtract', '-'],
  ['Divide', '/'],
]);

export const shimKeyboardEvent = (event: KeyboardEvent) => {
  if (aliases.has(event.key)) {
    const key = aliases.get(event.key);

    Object.defineProperty(event, 'key', {
      configurable: true,
      enumerable: true,
      get() {
        return key;
      },
    });
  }
};

export default (inputText, defaultDirection = 'rtl') => {
  return inputText.length === 0
      ? {direction: defaultDirection}
      : /^[A-Za-z]?$/.test(inputText[0])
          ? {direction: 'ltr'}
          : {direction: 'rtl'}
}
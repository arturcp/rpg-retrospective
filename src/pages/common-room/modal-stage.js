export const handleModalStage = (modalStage, options) => {
  const { themeRef } = options;

  switch (modalStage) {
    case 'initial':
      return { modalStage: 'chooseTheme' };
    case 'chooseTheme':
      const themeInput = themeRef.current.input;
      if (themeInput.value.trim() !== '') {
        return { modalStage: 'listItens' };
      } else {
        themeInput.classList.add('required')
        themeInput.focus();
        return {};
      }
    case 'listItens':
      return { modalStage: 'instructions' };
    case 'instructions':
      return { modalStage: '', showModal: false };
    default:
      return {};
  }
}

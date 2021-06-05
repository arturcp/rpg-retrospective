export const handleModalStage = (modalStage, options) => {
  const { themeRef } = options;

  switch (modalStage) {
    case 'initial':
      return { modalStage: 'chooseTheme' };
    case 'chooseTheme':
      const themeInput = themeRef.current.input;
      if (themeInput.value.trim() !== '') {
        return { modalStage: 'listItens', theme: themeInput.value.trim() };
      } else {
        themeInput.classList.add('required')
        themeInput.focus();
        return {};
      }
    case 'listItens':
      const {
        themeOption1Ref,
        themeOption2Ref,
        themeOption3Ref,
        themeOption4Ref
      } = options;

      const themeOption1Input = themeOption1Ref.current.input;
      const themeOption2Input = themeOption2Ref.current.input;
      const themeOption3Input = themeOption3Ref.current.input;
      const themeOption4Input = themeOption4Ref.current.input;

      themeOption1Input.classList.remove('required');
      themeOption2Input.classList.remove('required');
      themeOption3Input.classList.remove('required');
      themeOption4Input.classList.remove('required');

      if (themeOption1Input.value.trim() === '') {
        themeOption1Input.classList.add('required')
        themeOption1Input.focus();
      } else if (themeOption2Input.value.trim() === '') {
        themeOption2Input.classList.add('required')
        themeOption2Input.focus();
      } else if (themeOption3Input.value.trim() === '') {
        themeOption3Input.classList.add('required')
        themeOption3Input.focus();
      } else if (themeOption4Input.value.trim() === '') {
        themeOption4Input.classList.add('required')
        themeOption4Input.focus();
      } else {
        return {
          modalStage: 'answer',
          quizAnswer: themeOption1Input.value.trim(),
          themeOption1: themeOption1Input.value.trim(),
          themeOption2: themeOption2Input.value.trim(),
          themeOption3: themeOption3Input.value.trim(),
          themeOption4: themeOption4Input.value.trim(),
        };
      }
      break;
    case 'answer':
      return { modalStage: 'instructions' };
    case 'instructions':
      return { modalStage: 'finished', showModal: false };
    default:
      return {};
  }
}

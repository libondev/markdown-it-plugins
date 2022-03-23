import copyText from 'copy-text-to-clipboard'

export function copyCode() {
  if (typeof window === 'undefined')
    return

  window.addEventListener('load', () => {
    function onClickHTMLBody({ target }: PointerEvent | MouseEvent) {
      if (
        !(target instanceof HTMLButtonElement)
        || target.className !== 'copy-code-btn'
      )
        return

      // const text = target.parentNode!.parentNode!.previousElementSibling!.textContent!
      const text = target.closest('.collect-block-code')?.querySelector('pre')!.textContent as string

      if (copyText(text))
        target.style.background = '#e1f3d8'

      else
        target.style.background = '#fde2e2'

      setTimeout(() => {
        target.style.background = ''
      }, 1000)
    }

    window.addEventListener('click', onClickHTMLBody)
  })
}

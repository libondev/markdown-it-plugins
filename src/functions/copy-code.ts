export function copyCode() {
  if (typeof window === 'undefined')
    return

  // 如果不支持复制到剪切板则不用监听父级事件
  if (!navigator.clipboard || !navigator.clipboard.writeText)
    return

  window.addEventListener('load', () => {
    function onClickHTMLBody({ target }: PointerEvent | MouseEvent) {
      if (
        !(target instanceof HTMLButtonElement)
        || target.className !== 'copy-code-btn'
      )
        return

      // const text = target.parentNode!.parentNode!.previousElementSibling!.textContent!
      const text = target.parentNode!.parentNode?.nextSibling?.textContent as string
      navigator.clipboard.writeText(text)
      // eslint-disable-next-line no-console
      console.log('copy code successfully.')
    }

    window.addEventListener('click', onClickHTMLBody)
  })
}

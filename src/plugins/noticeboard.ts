import type { Markdown } from '../types/index'

export function noticeboard(md: Markdown) {
  const tipMarker = '?> '
  const dangerMarker = '!> '

  md.block.ruler.before('paragraph', 'noticeboard', (state, startLine, endLine, silent) => {
    // if it's indented more than 3 spaces, it should be a code block
    if (state.sCount[startLine] - state.blkIndent >= 4) return false

    const max = state.eMarks[startLine]
    const pos = state.bMarks[startLine] + state.tShift[startLine]
    const text = state.src.substring(pos, max).trim()

    if (text.startsWith(tipMarker) || text.startsWith(dangerMarker)) {
      if (silent) return true

      let token, type, markup

      if (text.startsWith(tipMarker)) {
        type = 'tip'
        markup = tipMarker
      }
      else {
        type = 'danger'
        markup = dangerMarker
      }

      token = state.push('heading_open', 'div', 1)
      token.attrs = [['class', `noticeboard ${type}`]]
      token.markup = markup
      token.map = [startLine, state.line]

      token = state.push('inline', '', 0)
      token.map = [startLine, state.line]
      token.content = text.substring(tipMarker.length)
      token.children = []

      token = state.push('heading_close', 'div', -1)
      token.markup = markup

      state.line = startLine + 1

      return true
    }

    return false
  })
}

import type { Markdown } from "../types/index"

export function noticeboard(md: Markdown) {
  const tipMarker = "-> "
  const warningMarker = "?> "
  const dangerMarker = "!> "

  const typeClassName = {
    tip: "bg-gray-500/20 border-gray-500/20",
    warning: "bg-yellow-500/20 border-yellow-500/20",
    danger: "bg-red-500/20 border-red-500/20",
  } as const

  md.block.ruler.before(
    "paragraph",
    "noticeboard",
    (state, startLine, endLine, silent) => {
      // if it's indented more than 3 spaces, it should be a code block
      if (state.sCount[startLine] - state.blkIndent >= 4) return false

      const max = state.eMarks[startLine]
      const pos = state.bMarks[startLine] + state.tShift[startLine]
      const text = state.src.substring(pos, max).trim()

      if (
        text.startsWith(tipMarker) ||
        text.startsWith(dangerMarker) ||
        text.startsWith(warningMarker)
      ) {
        if (silent) return true

        let token, type: keyof typeof typeClassName, markup: typeof tipMarker | typeof warningMarker | typeof dangerMarker

        if (text.startsWith(tipMarker)) {
          type = "tip"
          markup = tipMarker
        } else if (text.startsWith(warningMarker)) {
          type = "warning"
          markup = warningMarker
        } else {
          type = "danger"
          markup = dangerMarker
        }

        token = state.push("notice_open", "div", 1)
        token.attrs = [
          ["class", `noticeboard relative my-2.5 p-4 leading-none rounded-md border ${typeClassName[type]} ${type}`],
        ]
        token.markup = markup
        token.map = [startLine, state.line]

        token = state.push("inline", "", 0)
        token.map = [startLine, state.line]
        token.content = text.substring(tipMarker.length)
        token.children = []

        token = state.push("notice_close", "div", -1)
        token.markup = markup

        state.line = startLine + 1

        return true
      }

      return false
    }
  )
}

import type {
  Markdown,
  MarkdownPluginRestArgs,
  MarkdownTokens,
} from '../types/index'

export function noticeboard(md: Markdown) {
  const regexp = /([!|?])\>\s(.*)/
  const text = md.renderer.rules.text!

  md.renderer.rules.text = (tokens: MarkdownTokens, idx: number, ...rest: MarkdownPluginRestArgs) => {
    const { content } = tokens[idx]

    if (regexp.test(content)) {
      const [, type, text] = content.match(regexp)!
      return `<div class="noticeboard ${type === '!' ? 'tip' : 'danger'}">${text}</div>`
    }

    return text(tokens, idx, ...rest)
  }
}

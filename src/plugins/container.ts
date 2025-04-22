import MarkdownContainer from 'markdown-it-container'
import type { Markdown, MarkdownTokens } from '../types/index'

export function container(md: Markdown) {
  const regexp = /(tip|warning|danger|details)\s?(.*)/
  let lastTagName: string

  const typeClassName = {
    tip: 'bg-green-500/50',
    warning: 'bg-yellow-500/50',
    danger: 'bg-red-500/50',
  }

  function getTemplateStartTag(type: string, title: string) {
    if (type === 'details')
      return `<details class="prompt-container font-medium cursor-pointer details">${title
        ? `<summary class="prompt-container-title select-none"><span>${md.utils.escapeHtml(title)}</span></summary>`
        : ''}`

    return `<div class="prompt-container relative my-1 p-4 rounded-md ${type}"><p class="prompt-container-title">${md.utils.escapeHtml(title)}</p>`
  }

  function getTemplateEndTag() {
    if (lastTagName === 'details')
      return '</details>'

    return '</div>'
  }

  md.use(MarkdownContainer, 'container', {
    validate: (info: string) => info.trim().match(regexp)!,
    render(tokens: MarkdownTokens, idx: number) {
      if (tokens[idx].nesting === 1) {
        const [, type, info] = tokens[idx].info.trim().match(regexp)!

        lastTagName = type

        return getTemplateStartTag(type, info)
      }

      return getTemplateEndTag()
    },
  })
}

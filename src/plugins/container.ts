import MarkdownContainer from 'markdown-it-container'
import type { Markdown, MarkdownTokens } from '../types/index'

export function container(md: Markdown) {
  const regexp = /(tip|warning|danger|details)\s?(.*)/
  let lastTagName: string

  function getTemplateStartTag(type: string, title: string) {
    if (type === 'details')
      return `<details class="prompt-container details">${title ? `<summary class="prompt-container-title">${md.utils.escapeHtml(title)}</summary>` : ''}`

    return `<div class="prompt-container ${type}"><p class="prompt-container-title">${md.utils.escapeHtml(title)}</p>`
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

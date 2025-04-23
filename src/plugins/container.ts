import MarkdownContainer from 'markdown-it-container'
import type { Markdown, MarkdownTokens } from '../types/index'

const typeClassName = {
  tip: 'bg-green-500/50 border-green-500/50',
  warning: 'bg-yellow-500/50 border-yellow-500/50',
  danger: 'bg-red-500/50 border-red-500/50',
} as const

const titleColorClassName = {
  tip: 'text-green-700',
  warning: 'text-yellow-700',
  danger: 'text-red-700',
} as const

type Types = keyof typeof typeClassName & 'details'

export function container(md: Markdown) {
  const regexp = /(tip|warning|danger|details)\s?(.*)/
  let lastTagName: string


  function getTemplateStartTag(type: Types, title: string) {
    if (type === 'details')
      return `<details class="prompt-container block my-2.5 p-1 cursor-pointer bg-gray-200 rounded-lg details">${title
        ? `<summary class="prompt-container-title font-medium select-none px-2 py-1.5 rounded-md bg-background"><span class="pl-1">${md.utils.escapeHtml(title)}</span></summary><div class="prompt-container-content px-3 pt-2 pb-1">`
        : ''}`

    return `<div class="prompt-container relative my-2.5 border-l-8 py-2 px-3 rounded-md ${type} ${typeClassName[type]}"><p class="prompt-container-title font-bold ${titleColorClassName[type]}">${md.utils.escapeHtml(title)}</p>`
  }

  function getTemplateEndTag() {
    if (lastTagName === 'details')
      return '</div></details>'

    return '</div>'
  }

  md.use(MarkdownContainer, 'container', {
    validate: (info: string) => info.trim().match(regexp)!,
    render(tokens: MarkdownTokens, idx: number) {
      if (tokens[idx].nesting === 1) {
        const [, type, info] = tokens[idx].info.trim().match(regexp)!

        lastTagName = type

        return getTemplateStartTag(type as Types, info)
      }

      return getTemplateEndTag()
    },
  })
}

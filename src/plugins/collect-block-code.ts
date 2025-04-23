
import type {
  Markdown,
  MarkdownOptions,
  MarkdownRenderer,
  MarkdownTokens,
} from '../types/index'

export interface CollectCodeBlock {
  /**
   * Show the code block language.
   * @type {boolean}
   * @default true
   */
  lang?: boolean

  /**
   * Shows the copy code block content button.
   * @type {boolean}
   * @default false
   */
  copy?: boolean

  /**
   * Always expand the code block.
   * @type {boolean}
   * @default true
   */
  open?: boolean

  /**
   * Copy the content button text.
   * @type {string}
   * @default: 'Copy'
   */
  copyText?: string

  /**
   * The delimiter for the code block name.
   * @type {string}
   * @default ':'
   */
  separator?: string

  /**
   * Display code block names.
   * @type {boolean}
   * @default false
   */
  blockName?: boolean
}

export function collectBlockCode(
  md: Markdown,
  {
    lang = true,
    copy = false,
    open = true,
    copyText = 'copy',
    separator = ':',
    blockName = false,
  }: CollectCodeBlock = {},
) {
  const fence = md.renderer.rules.fence!
  let template: string, openStatus: string
  md.renderer.rules.fence = (
    tokens: MarkdownTokens,
    idx: number,
    ...args: [options: MarkdownOptions, env: unknown, self: MarkdownRenderer]
  ): string => {
    const [language, name, status] = tokens[idx].info.split(separator).map((s: string) => s.trim())

    if (status)
      openStatus = status === 'close' ? '' : status === 'open' ? 'open' : status
    else
      openStatus = open ? 'open' : ''

    template = `<details class="collect-block-code my-4 rounded-md border overflow-hidden" ${openStatus ? 'open' : ''}><summary class="collect-block-trigger flex items-center cursor-pointer "><i class="block-code-icon"></i>${blockName && name ? `<p class="block-code-name">${name}</p>` : '<i style="flex:1"></i>'}`

    const code = fence(tokens, idx, ...args)

    if (copy || blockName)
      template += `${lang ? `<span class="block-code-lang">${language}</span>` : ''}${copy ? `<button class="copy-code-btn" data-text="${copyText}" data-code='${code}'></button>` : ''}`

    template += `</summary><div class="collect-block-content flex border-t">${code}</div></details>`

    return template
  }
}

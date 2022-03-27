
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
    copyText = 'Copy',
    separator = ':',
    blockName = false,
  }: CollectCodeBlock = {},
) {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (
    tokens: MarkdownTokens,
    idx: number,
    ...args: [options: MarkdownOptions, env: unknown, self: MarkdownRenderer]
  ): string => {
    const [language, name] = tokens[idx].info.split(separator).map((s: string) => s.trim())

    let template = `<details class="collect-block-code" ${open ? 'open' : ''}><summary class="collect-block-trigger"><i class="block-code-icon"></i>${blockName && name ? `<p class="block-code-name">${name}</p>` : '<i style="flex:1"></i>'}`

    if (copy || blockName)
      template += `${lang ? `<span class="block-code-lang">${language}</span>` : ''}${copy ? `<button class="copy-code-btn">${copyText}</button>` : ''}`

    template += `</summary><div class="collect-block-content">${fence(tokens, idx, ...args)}</div></details>`

    return template
  }
}

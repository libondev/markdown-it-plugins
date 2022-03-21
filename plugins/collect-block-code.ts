
import type {
  Markdown,
  MarkdownOptions,
  MarkdownRenderer,
  MarkdownTokens,
} from '../types/index'

export interface CollectCodeBlock {
  lang?: boolean
  copy?: boolean
  copyText?: string
  separator?: string
  blockName?: boolean
}

export function collectBlockCode(
  md: Markdown,
  {
    blockName,
    lang = true,
    copy = false,
    separator = ':',
    copyText = 'Copy',
  }: CollectCodeBlock = {},
) {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (
    tokens: MarkdownTokens,
    idx: number,
    ...args: [options: MarkdownOptions, env: unknown, self: MarkdownRenderer]
  ): string => {
    const [language, name] = tokens[idx].info.split(separator).map(s => s.trim())

    let template = `<details class="collect-block-code"><summary class="collect-block-trigger"><div class="trigger-lt"><i class="block-code-icon"></i>${blockName ? `<span class="block-code-name">${name}</span>` : ''}</div>`

    if (copy || blockName)
      template += `<div class="trigger-rt">${lang ? `<span class="block-code-lang">${language}</span>` : ''}${copy ? `<button class="copy-code-btn">${copyText}</button>` : ''}</div>`

    template += `</summary><div class="collect-block-content">${fence(tokens, idx, ...args)}</div></details>`

    return template
  }
}


import type { Markdown, MarkdownPluginRestArgs, MarkdownTokens } from '../types/index'

export function codeLineNumbers(md: Markdown) {
  const fence = md.renderer.rules.fence!
  md.renderer.rules.fence = (tokens: MarkdownTokens, idx: number, ...args: MarkdownPluginRestArgs) => {
    const lineNumbersCode = `${[...new Array(tokens[idx].content.split('\n').length).keys()]
      .join('</li><li class="line">')}</li>`.slice(6) // slice '0</span><br>'

    return `
      <ul class="code-line-numbers">
        ${lineNumbersCode}
      </ul>
      ${fence(tokens, idx, ...args)}
    `
  }
}

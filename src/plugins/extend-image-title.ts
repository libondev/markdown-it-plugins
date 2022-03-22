import type { Markdown, MarkdownPluginRestArgs, MarkdownTokens } from '../types/index'

export function extendImage(md: Markdown) {
  const image = md.renderer.rules.image!
  md.renderer.rules.image = (tokens: MarkdownTokens, idx: number, ...args: MarkdownPluginRestArgs) => {
    const token = tokens[idx]
    const titleIndex = token.attrs?.findIndex(([prop]) => prop === 'title')

    // 如果存在 title 属性
    if (titleIndex && titleIndex >= 0) {
      // 并且它的值中包含 =，那么暂认为其想要设置属性
      if (~token.attrs![titleIndex][1].indexOf('=')) {
        let key, value
        const attrs = token.attrs![titleIndex][1].split('&')

        token.attrSet('title', '')
        attrs.forEach((item) => {
          [key, value] = item.split('=')

          token.attrSet(key, value)
        })
      }
    }

    return image(tokens, idx, ...args)
  }
}


import type { Markdown } from '../types/index'

interface CodeLineNumbers {
  lang?: boolean
  copy?: boolean
  copyText?: string
}

export default function(md: Markdown, options: CodeLineNumbers = {}) {
  md.renderer.rules.fence = (tokens, idx, options, env, slf): string => {
    // const token = tokens[idx]

    // // get token info
    // const info = token.info ? md.utils.unescapeAll(token.info).trim() : ''

    // // resolve language from token info
    // const language = resolveLanguage(info)
    // const languageClass = `${options.langPrefix}${language.name}`

    // // try to get highlighted code
    // const code =
    //   options.highlight?.(token.content, language.name, '') ||
    //   md.utils.escapeHtml(token.content)

    // // wrap highlighted code with `<pre>` and `<code>`
    // let result = code.startsWith('<pre')
    //   ? code
    //   : `<pre class="${languageClass}"><code>${code}</code></pre>`

    // // resolve v-pre mark from token info
    // // const useVPre = resolveVPre(info) ?? vPre
    // // if (useVPre) {
    // //   result = `<pre v-pre${result.slice('<pre'.length)}`
    // // }

    // // if `preWrapper` is disabled, return directly
    // // if (!preWrapper) {
    // //   return result
    // // }

    // // code fences always have an ending `\n`, so we should trim the last line
    // const lines = code.split('\n').slice(0, -1)

    // // resolve highlight line ranges from token info
    // const highlightLinesRanges = highlightLines
    //   ? resolveHighlightLines(info)
    //   : null
    // // generate highlight lines
    // if (highlightLinesRanges) {
    //   const highlightLinesCode = lines
    //     .map((_, index) => {
    //       if (isHighlightLine(index + 1, highlightLinesRanges)) {
    //         return '<div class="highlight-line">&nbsp;</div>'
    //       }
    //       return '<br>'
    //     })
    //     .join('')

    //   result = `${result}<div class="highlight-lines">${highlightLinesCode}</div>`
    // }

    // // resolve line-numbers mark from token info
    // const useLineNumbers =
    //   resolveLineNumbers(info) ??
    //   (typeof lineNumbers === 'number'
    //     ? lines.length >= lineNumbers
    //     : lineNumbers)
    // // generate line numbers
    // if (useLineNumbers) {
    //   // generate line numbers code
    //   const lineNumbersCode = lines
    //     .map((_, index) => `<span class="line-number">${index + 1}</span><br>`)
    //     .join('')

    //   result = `${result}<div class="line-numbers" aria-hidden="true">${lineNumbersCode}</div>`
    // }

    // result = `<div class="${languageClass} ext-${language.ext}${useLineNumbers ? ' line-numbers-mode' : ''
    //   }">${result}</div>`

    // return result
    return ''
  }
}

import hljs from 'highlight.js'
import MarkdownIt from 'markdown-it'
import {
  codeLineNumbers,
  collectBlockCode,
  container,
  extendImageTitle,
  noticeboard,
} from '../src/index'

import content from './content'

import 'highlight.js/styles/github.css'
import '../src/styles/collect-block-code.scss'
import '../src/styles/code-line-numbers.scss'
import '../src/styles/container.scss'
import '../src/styles/noticeboard.scss'

const wrapper = document.getElementById('app')

const md = new MarkdownIt({
  html: true,
  linkify: true,
  highlight(code: string, language: string) {
    if (language && hljs.getLanguage(language))
      return `<pre data-lang="${language}"><code>${hljs.highlight(code, { language }).value}</code></pre>`

    return `<pre data-lang="unknown"><code>${code}</code></pre>`
  },
})
  .use(codeLineNumbers)
  .use(collectBlockCode, { copy: true, blockName: true })
  .use(noticeboard)
  .use(container)
  .use(extendImageTitle)

wrapper!.innerHTML = md.render(content)

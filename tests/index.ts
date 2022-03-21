import MarkdownIt from 'markdown-it'
import {
  noticeboard,
} from '../index'

import content from './content'

import '../styles/collect-block-code.scss'
import '../styles/container.scss'
import '../styles/noticeboard.scss'

const wrapper = document.getElementById('app')

const md = new MarkdownIt({
  html: true,
  linkify: true,
})
  // .use(collectBlockCode, { copy: true, blockName: true })
  // .use(codeLineNumbers)
  .use(noticeboard)

wrapper!.innerHTML = md.render(content)

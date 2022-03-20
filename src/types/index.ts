import type MarkdownIt from 'markdown-it'

export type Markdown = ReturnType<typeof MarkdownIt>
export type MarkdownTokens = ReturnType<Markdown['parse']>
export type MarkdownOptions = Markdown['options']
export type MarkdownRenderer = Markdown['renderer']

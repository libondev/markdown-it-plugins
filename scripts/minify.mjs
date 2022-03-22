#!/usr/bin/env zx
/* eslint-disable one-var */

import { $ } from 'zx'
import sass from 'sass'
import fs from 'fs-extra'
import fg from 'fast-glob'

async function minify() {
  await $`uglifyjs -c -m -o dist/index.cjs -- dist/index.cjs`
  await $`uglifyjs -c -m -o dist/index.mjs -- dist/index.mjs`

  let filename = '', filepath = ''
  fg.sync('./src/styles/*.scss').map(async(path) => {
    filename = path.split('/').pop().split('.')[0]
    filepath = `./dist/${filename}.css`

    fs.writeFileSync(filepath, sass.compile(path).css)
    await $`uglifycss ${filepath} --output ${filepath}`
  })
}

minify().catch(() => {})

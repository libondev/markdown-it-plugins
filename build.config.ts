import { defineBuildConfig } from 'unbuild'

export default defineBuildConfig({
  entries: ['./index.ts'],
  declaration: true,
  clean: true,
  rollup: {
    emitCJS: true,
  },
})

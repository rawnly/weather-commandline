import test from 'ava'
import execa from 'execa'
import pkg from './package'

test('Version Check', t => {
  execa('node', ['build/bin/index.js', '--version'], (stderr, stdout) => {
    t.is(stdout, pkg.version)
  })
})

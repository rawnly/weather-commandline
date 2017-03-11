import test from 'ava'
import execa from 'execa'
import pkg from './package'

test('Test 1', () => {
  execa('node', ['index.js', '--version'], (stderr, stdout) => {
    if (stdout === pkg.version) {
      return true
    }
    return false
  })
})

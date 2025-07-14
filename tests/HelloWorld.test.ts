import { render, screen } from '@testing-library/vue'
import HelloWorld from '../src/components/HelloWorld.vue'

describe('HelloWorld.vue', () => {
  it('renders the props.msg when passed', () => {
    render(HelloWorld, {
      props: { msg: 'Hello Vitest' },
    })

    expect(screen.getByText('Hello Vitest')).toBeTruthy()
  })
})

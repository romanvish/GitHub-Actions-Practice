import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import App from '../src/HelloWorld/HelloWorld.vue'; // Adjust the path to your main App component

describe('HelloWorld.vue', () => {
  it('renders correctly', () => {
    const wrapper = mount(App);
    expect(wrapper.text()).toContain('Hello World'); // Adjust based on your App.vue content
  });
});
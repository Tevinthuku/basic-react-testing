import React from "react";
import Enzyme, { shallow } from "enzyme";
import EnzymeAdapter from "enzyme-adapter-react-16";

import App from "./App";

Enzyme.configure({ adapter: new EnzymeAdapter() });

/**
 * Factory function to create a ShallowWrapper for the App Component
 * @param {object} props component props
 * @param {object} state component state
 * @returns {ShallowWrapper}
 */
const setup = (props = {}, state = {}) => {
  const wrapper = shallow(<App {...props} />);
  if (state) wrapper.setState(state);

  return wrapper;
};

/**
 *
 * @param {ShallowWrapper} wrapper
 * @param {string} val
 * @return {ShallowWrapper}
 * return ShallowWrapper containing node(s) with the given data-test value
 */
const findByTestAttr = (wrapper, val) => {
  return wrapper.find(`[data-test="${val}"]`);
};

test("renders without error", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "component-app");
  expect(appComponent.length).toBe(1);
});

test("renders increment button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "increment-button");
  expect(button.length).toBe(1);
});

test("renders counter display", () => {
  const wrapper = setup();
  const appComponent = findByTestAttr(wrapper, "counter-display");
  expect(appComponent.length).toBe(1);
});

test("counter starts at 0", () => {
  const wrapper = setup();
  const initialCounterState = wrapper.state("counter");
  expect(initialCounterState).toBe(0);
});

test("clicking button increments the counter in the display", () => {
  const counter = 7;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, "increment-button");
  // find button and click
  button.simulate("click");
  wrapper.update();
  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter + 1);
});

test("Clicking the decrement button", () => {
  const counter = 1;
  const wrapper = setup(null, { counter });
  const button = findByTestAttr(wrapper, "decrement-button");
  //click the decrement button
  button.simulate("click");
  wrapper.update();
  // find display and test value
  const counterDisplay = findByTestAttr(wrapper, "counter-display");
  expect(counterDisplay.text()).toContain(counter - 1);
});

test("it renders the decrement button", () => {
  const wrapper = setup();
  const button = findByTestAttr(wrapper, "decrement-button");
  expect(button.length).toBe(1);
});

describe("Testing the decrement button when count is at 0", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = setup();

    const button = findByTestAttr(wrapper, "decrement-button");

    button.simulate("click");
    wrapper.update();
  });

  test("Clicking decrement button to below zero results in error", () => {
    const counterDisplay = findByTestAttr(wrapper, "counter-display");
    expect(counterDisplay.text()).toContain("Cannot go lower than zero");
    expect(wrapper.state("counter")).toBe(0);
  });

  test("increment after zero error to result in counter being shown as 1", () => {
    const incrementButton = findByTestAttr(wrapper, "increment-button");
    // after error
    incrementButton.simulate("click");
    wrapper.update();
    const counterDisplay = findByTestAttr(wrapper, "counter-display");
    expect(counterDisplay.text()).toContain(1);
  });
});

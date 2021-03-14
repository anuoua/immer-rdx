/**
 * @jest-environment jsdom
 */
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { store } from "./AppUseRDX";
import { TestApp } from "./AppUseRDX";

Enzyme.configure({ adapter: new Adapter() });

describe("useRDX", () => {
  const wrapper = mount(
    <Provider store={store}>
      <TestApp />
    </Provider>
  );

  it("test actions", () => {
    wrapper.find("div").simulate("click");
    expect(wrapper.text()).toBe("hello");
  });
});

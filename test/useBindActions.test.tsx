/**
 * @jest-environment jsdom
 */
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { Provider } from "react-redux";
import { mount } from "enzyme";
import { store } from "./AppUseBindActions";
import { TestApp } from "./AppUseBindActions";

Enzyme.configure({ adapter: new Adapter() });

describe("useBindActions", () => {
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

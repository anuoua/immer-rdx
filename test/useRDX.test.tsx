/**
 * @jest-environment jsdom
 */
import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import React from "react";
import { mount } from "enzyme";
import { store, TestApp } from "./components/AppUseRDX";
import { RDXProvider } from "../src";
import { reducerManager } from "../example/redux";

Enzyme.configure({ adapter: new Adapter() });

describe("useRDX", () => {
  const wrapper = mount(
    <RDXProvider store={store} reducerManager={reducerManager}>
      <TestApp />
    </RDXProvider>
  );

  it("test actions", () => {
    wrapper.find("div").simulate("click");
    expect(wrapper.text()).toBe("hello");
  });
});

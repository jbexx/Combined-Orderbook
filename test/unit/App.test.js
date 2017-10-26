import React from "react";
import ReactDOM from "react-dom";
import App from "../../src/components/App/App";
import Chart from "../../src/components/Chart/Chart";
import Orderbook from "../../src/components/Orderbook/Orderbook";
import { mount, shallow } from "enzyme";

// "test": "react-scripts test --env=jsdom",

describe("App", () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<App />);
  });

  it("should exist", () => {
    expect(wrapper).toBeDefined();
  });

  it("should render the Login component", () => {
    expect(wrapper.find("Login").length).toEqual(1);
  });

  it("should render the Chart component", () => {
    expect(wrapper.find("Chart").length).toEqual(1);
  });

  it("should render the Orderbook component", () => {
    expect(wrapper.find("Orderbook").length).toEqual(1);
  });

  it("should setState with data after component mounts", () => {
    expect(wrapper.state("books")).toEqual({});

    wrapper = mount(<App />);
    const objKeys = Object.keys(wrapper.state("books"));

    expect(objKeys.length).toEqual(2);
  });
});
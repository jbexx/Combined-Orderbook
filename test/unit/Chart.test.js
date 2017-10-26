import React from "react";
import ReactDOM from "react-dom";
import Chart from "../../src/components/Chart/Chart";
import { mount, shallow } from "enzyme";

describe("Chart", () => {
  let wrapper;

  const mockData = {
    bittrex_book: [
      {
        id: 1,
        bid_volume: 15.87026720,
        bid: 0.05312345,
        ask: 0.05316942,
        ask_volume: 1.81754771
      },
      {
        id: 2,
        bid_volume: 5.00000000,
        bid: 0.05312344,
        ask: 0.05323297,
        ask_volume: 5.39021754
      }
    ],

    poloniex_book: [
      {
        id: 1,
        bid_volume: 15.253,
        bid: 0.05321642,
        ask: 0.05327551,
        ask_volume: 0.01855085
      },
      {
        id: 2,
        bid_volume: 26.50327083,
        bid: 0.05321641,
        ask: 0.05330907,
        ask_volume: 0.01855239
      }
    ]
  }

  beforeEach(() => {
    wrapper = shallow(<Chart orderbooks={ mockData } />);
  });

  it("should exist", () => {
    expect(wrapper).toBeDefined();
  });

  it("should have the correct props", () => {
    expect(wrapper.props()).toHaveProperty('bittrex_book', mockData.bittrex_book);
    expect(wrapper.props()).toHaveProperty('poloniex_book', mockData.poloniex_book);
  });
});
import React from "react";
import "../enzyme";
import { shallow } from "enzyme";
import Layout from "../components/Layout";

describe("Layout which contains navbar", () => {
  let wrap;

  beforeEach(() => {
    wrap = shallow(<Layout />);
    return wrap;
  });

  test("H1 check", () => {
    const title = wrap.find("h1");
    expect(title.text()).toBe("The Events Calendar");
    expect(title.simulate("click"));
    expect(wrap.find("Link").at(0).prop("href")).toEqual("/");
  });

  test("login button (route check included)", async () => {
    const loginBtn = wrap.find("Link").at(1);
    expect(loginBtn.text()).toBe("<Link />");
    expect(loginBtn.simulate("click"));
    expect(loginBtn.prop("href")).toEqual("../login");
  });
});

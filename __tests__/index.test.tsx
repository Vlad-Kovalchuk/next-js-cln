import React from "react";
import "../enzyme";
import { render, fireEvent, screen } from "@testing-library/react";
import Welcome from "../pages";
import { shallow } from "enzyme";
import * as stuff from "../lib/hooks";

describe("Welcome Page clicking elements:", () => {
  let wrap;

  beforeEach(() => {
    wrap = shallow(<Welcome />);
    // const wrap = mount(<Welcome />);
    return wrap;
  });
  test("pic", async () => {
    render(<Welcome />);
    const pic = screen.getByAltText(/moon/i);
    fireEvent.click(pic);
    const paragraph = screen.getByText(/Create an account or login/i);
    fireEvent.click(paragraph);
  });
  test("paragraph", async () => {
    render(<Welcome />);
    const paragraph = screen.getByText(/Create an account or login/i);
    fireEvent.click(paragraph);
  });
  test("Login (route check included)", async () => {
    expect(wrap.find({ href: "/login" }).text()).toBe("<Link />");
    expect(wrap.find({ href: "/login" }).simulate("click", { button: 0 }));
    expect(wrap.find("Link").at(0).prop("href")).toEqual("/login");
  });
  test("Register (route check included)", async () => {
    expect(wrap.find({ href: "/register" }).text()).toBe("<Link />");
    expect(wrap.find({ href: "/register" }).simulate("click", { button: 0 }));
    expect(wrap.find("Link").at(1).prop("href")).toEqual("/register");
  });

  test("should pass this by clicking Dashboard", async () => {
    jest
      .spyOn(stuff, "useCurrentUser")
      .mockReturnValue([{ name: "test", email: "test@test.test" }]);
    wrap = shallow(<Welcome />);
    expect(wrap.find({ href: "/dashboard" }).text()).toBe("<Link />");
    expect(wrap.find({ href: "/dashboard" }).simulate("click", { button: 0 }));
    expect(wrap.find("Link").at(0).prop("href")).toEqual("/dashboard");
  });
});

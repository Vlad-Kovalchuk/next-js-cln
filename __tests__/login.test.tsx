import React from "react";
import "../enzyme";
import Login from "../pages/login";
import { mount, shallow } from "enzyme";

describe("Login page", () => {
  let wrap;

  beforeEach(() => {
    wrap = shallow(<Login />);
    return wrap;
  });

  test("clicking Register link (route check included)", async () => {
    const button = wrap.find("Link");
    expect(button.simulate("click", { button: 0 }));
    expect(button.prop("href")).toEqual("/register");
  });

  test("has input for email", () => {
    expect(wrap.containsMatchingElement(<input type="email" />)).toBe(true);
  });

  test("has input for password", () => {
    expect(wrap.containsMatchingElement(<input type="password" />)).toBe(true);
  });

  test("add some data in form", () => {
    const array = [
      {
        name: "email",
        value: "test@test.test",
      },
      {
        name: "password",
        value: "123456",
      },
    ];
    array.forEach((element) => {
      expect(
        wrap.find(`#${element.name}`).simulate("change", {
          target: {
            name: element.name,
            id: element.name,
            type: element.name,
            value: element.value,
          },
        })
      );
      expect(wrap.find(`#${element.name}`).props("value").value).toEqual(
        element.value
      );
    });
  });

  test("useEffect trigger check", async () => {
    expect((wrap = mount(<Login />)).exists()).toBeTruthy();
  });

  test("onSubmit check", async () => {
    expect(wrap.find("button").simulate("click"));
  });

  test("should fail if no credentials are provided", () => {
    const fakeEvent = { preventDefault: () => {} };
    expect(wrap.find("form").length).toBe(1);
    wrap.find("form").simulate("submit", fakeEvent);
  });
});

import React from "react";
import "../enzyme";
import Register from "../pages/register";
import { mount, shallow } from "enzyme";

describe("Register page", () => {
  let wrap;

  beforeEach(() => {
    wrap = shallow(<Register />);
  });

  test("clicking Login link (route check included)", async () => {
    const button = wrap.find("Link");
    expect(button.simulate("click", { button: 0 }));
    expect(button.prop("href")).toEqual("/login");
  });

  test("has input for name", () => {
    expect(wrap.containsMatchingElement(<input type="text" />)).toBe(true);
  });

  test("has input for email", () => {
    expect(wrap.containsMatchingElement(<input type="email" />)).toBe(true);
  });

  test("has input for password", () => {
    expect(wrap.containsMatchingElement(<input type="password" />)).toBe(true);
  });

  test("has input for password2", () => {
    expect(wrap.containsMatchingElement(<input type="password" />)).toBe(true);
  });

  test("add some data in form", () => {
    const array = [
      {
        name: "name",
        value: "test",
      },
      {
        name: "email",
        value: "test@test.test",
      },
      {
        name: "password",
        value: "123456",
      },
      {
        name: "password2",
        value: "123456",
      },
    ];
    array.forEach((element) => {
      expect(
        wrap.find(`#${element.name}`).simulate("change", {
          target: { name: element.name, value: element.value },
        })
      );
      expect(wrap.find(`#${element.name}`).props("value").value).toEqual(
        element.value
      );
    });
    expect(wrap.find("button").simulate("click", { button: 0 }));
  });

  test("useEffect trigger check", async () => {
    expect((wrap = mount(<Register />)).exists()).toBeTruthy();
  });

  test("should fail if no credentials are provided", () => {
    const fakeEvent = { preventDefault: () => {} };
    expect(wrap.find("form").length).toBe(1);
    wrap.find("form").simulate("submit", fakeEvent);
  });
});

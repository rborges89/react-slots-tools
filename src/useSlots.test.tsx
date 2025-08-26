import * as React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { useSlots } from "./useSlots";
import { SlotWithParameters } from "./types";
import { TemplateSlot } from "./TemplateSlot";

const dummyUserData = {
  id: 1,
  firstName: "Emily",
  lastName: "Johnson",
  maidenName: "Smith",
  age: 28,
  gender: "female",
  email: "emily.johnson@x.dummyjson.com",
  phone: "+81 965-431-3024",
  role: "admin",
};

type ChildrenType = { children: React.ReactNode };

type AvailableTestType = "header" | "footer";

type AvailableTestWithSlotsType = "header" | "footer" | "other";

function UnderTestTemplateSlot({ children }: ChildrenType) {
  const testUri = "https://dummyjson.com/users/1";

  const [user, setUser] = React.useState<any>(dummyUserData);

  const { slots, get, has, list } =
    useSlots<AvailableTestWithSlotsType>(children);

  return (
    <div>
      <div data-testid="has-header">{String(has("header"))}</div>
      <div data-testid="header-count">{list("header").length}</div>
      <div data-testid="default-count">{list("default").length}</div>
      <div data-testid="footer-exists">{String(!!get("footer"))}</div>
      {slots.other && (
        <div data-testid="has-named-slot-with-params">
          {(slots.other as SlotWithParameters)({ ...user })}
        </div>
      )}
    </div>
  );
}

type users = {
  firstName: string;
  lastName: string;
  email: string;
};

describe("useSlotsWithTemplateSlot", () => {
  it("group children by slot name and default", () => {
    const { getByTestId } = render(
      <UnderTestTemplateSlot>
        <h1 slot="header">Title</h1>
        <p parent-slot="header">Subtitle</p>
        <span>Default A</span>
        <i>Default B</i>
        <small parent-slot="footer">Foot</small>

        <TemplateSlot<users> parent-slot="other">
          {(data) => (
            <>
              <p className="template-slot-paragraph">
                {data?.firstName} {data?.lastName}
              </p>
              <h2 className="template-slot-h2">{data?.email}</h2>
            </>
          )}
        </TemplateSlot>
      </UnderTestTemplateSlot>
    );

    console.log(getByTestId("has-named-slot-with-params").innerHTML);
    expect(getByTestId("has-header").textContent).toBe("true");
    expect(getByTestId("header-count").textContent).toBe("2");
    expect(getByTestId("default-count").textContent).toBe("2");
    expect(getByTestId("footer-exists").textContent).toBe("true");
    expect(getByTestId("has-named-slot-with-params").innerHTML).toBe(
      `<p class="template-slot-paragraph">${dummyUserData.firstName} ${dummyUserData.lastName}</p><h2 class="template-slot-h2">${dummyUserData.email}</h2>`
    );
  });
});

function UnderTest({ children }: ChildrenType) {
  const { slots, get, has, list } = useSlots<AvailableTestType>(children);

  return (
    <div>
      <div data-testid="has-header">{String(has("header"))}</div>
      <div data-testid="header-count">{list("header").length}</div>
      <div data-testid="default-count">{list("default").length}</div>
      <div data-testid="footer-exists">{String(!!get("footer"))}</div>
    </div>
  );
}

describe("useSlots", () => {
  it("group children by slot name and default", () => {
    const { getByTestId } = render(
      <UnderTest>
        <h1 slot="header">Title</h1>
        <p parent-slot="header">Subtitle</p>
        <span>Default A</span>
        <i>Default B</i>
        <small parent-slot="footer">Foot</small>
      </UnderTest>
    );

    expect(getByTestId("has-header").textContent).toBe("true");
    expect(getByTestId("header-count").textContent).toBe("2");
    expect(getByTestId("default-count").textContent).toBe("2");
    expect(getByTestId("footer-exists").textContent).toBe("true");
  });
});

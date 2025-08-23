import * as React from "react";
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import { useSlots } from "./useSlots";

type ChildrenType = { children: React.ReactNode };

type AvailableTestType = "header" | "footer";

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
  it("agrupa children por nombre de slot y default", () => {
    const { getByTestId } = render(
      <UnderTest>
        <h1 slot="header">Title</h1>
        <p slot-parent="header">Subtitle</p>
        <span>Default A</span>
        <i>Default B</i>
        <small slot-parent="footer">Foot</small>
      </UnderTest>
    );

    console.log(getByTestId("has-header"));

    expect(getByTestId("has-header").textContent).toBe("true");
    expect(getByTestId("header-count").textContent).toBe("2");
    expect(getByTestId("default-count").textContent).toBe("2");
    expect(getByTestId("footer-exists").textContent).toBe("true");
  });
});

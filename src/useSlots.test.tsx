import * as React from "react";
import { render } from "@testing-library/react";
import { useSlots } from "./useSlots";

function UnderTest({ children }: { children: React.ReactNode }) {
  const { get, has, list } = useSlots(children);
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
        <p slotName="header">Subtitle</p>
        <span>Default A</span>
        <i>Default B</i>
        <small slot-name="footer">Foot</small>
      </UnderTest>
    );

    expect(getByTestId("has-header").textContent).toBe("true");
    expect(getByTestId("header-count").textContent).toBe("2");
    expect(getByTestId("default-count").textContent).toBe("2");
    expect(getByTestId("footer-exists").textContent).toBe("true");
  });
});

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from "@/components/Button";

describe("Button", () => {
  test("renders correctly", () => {
    render(<Button onClick={() => {}}>Save</Button>);

    expect(screen.getByText("Save")).toBeInTheDocument();
  });

  test("calls onClick when clicked", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();

    render(<Button onClick={onClick}>Submit</Button>);

    await user.click(screen.getByText("Submit"));

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

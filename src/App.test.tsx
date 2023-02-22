import { fireEvent, render, screen } from "@testing-library/react";
import App from "./App";
import { act } from "react-dom/test-utils";

beforeEach(() => {
  const mockedFetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          tax_brackets: [
            { max: 48535, min: 0, rate: 0.15 },
            { max: 97069, min: 48535, rate: 0.205 },
          ],
        }),
    })
  ) as jest.Mock;
  
  global.fetch = mockedFetch;
})
test("makes an API call on app load", async () => {
  await act(() => {
    render(<App />);
  });
  expect(fetch).toHaveBeenCalledTimes(1);
});

test("renders correct taxes owed when given an income", async () => {
  await act(() => {
    render(<App />);
  });

  const input = screen.getByTestId("income_input");
  const button = screen.getByTestId("income_button");
  const result = screen.getByTestId("taxes_owed");
  const incomeAmount = "100"
  expect(result.textContent).toBe("$0.00");
  
  const event = {
    target: { value: incomeAmount },
  };
  fireEvent.change(input, event);
  fireEvent.click(button);
  await expect(result.textContent).toBe("$15.00");
});
test("renders correct result for single bracket", async () => {
  await act(() => {
    render(<App />);
  });

  const input = screen.getByTestId("income_input");
  const button = screen.getByTestId("income_button");
  const incomeAmount = "100"
  
  const event = {
    target: { value: incomeAmount },
  };
  fireEvent.change(input, event);
  fireEvent.click(button);
  const result = screen.getAllByTestId('owed_bracket')
  await expect(result.length).toBe(1)
  await expect(result[0].textContent).toBe('For the tax bracket rate of: 0.15You owe the total: $15.00')
});
test("renders correct results owed per bracket for multiple brackets", async () => {
  await act(() => {
    render(<App />);
  });

  const input = screen.getByTestId("income_input");
  const button = screen.getByTestId("income_button");
  const incomeAmount = "75000"
  
  const event = {
    target: { value: incomeAmount },
  };
  fireEvent.change(input, event);
  fireEvent.click(button);
  const result = screen.getAllByTestId('owed_bracket')
  await expect(result.length).toBe(2)
  await expect(result[0].textContent).toBe('For the tax bracket rate of: 0.15You owe the total: $7280.25')
  await expect(result[1].textContent).toBe('For the tax bracket rate of: 0.205You owe the total: $5425.32')
});

test("renders correct effective rate when given an income", async () => {
  await act(() => {
    render(<App />);
  });

  const input = screen.getByTestId("income_input");
  const button = screen.getByTestId("income_button");
  const incomeAmount = "100"
  const event = {
    target: { value: incomeAmount },
  };
  fireEvent.change(input, event);
  fireEvent.click(button);
  const result = screen.getByTestId("effective_rate");
  await expect(result.textContent).toBe("15.00%");
});

test("renders error message when no income provided", async () => {
  await act(() => {
    render(<App />);
  });

  const input = screen.getByTestId("income_input");
  const button = screen.getByTestId("income_button");
  const incomeAmount = ""
  const event = {
    target: { value: incomeAmount },
  };
  fireEvent.change(input, event);
  fireEvent.click(button);
  const result = screen.getByText(/Please input an income value/i);
  await expect(result).toBeInTheDocument();
});





import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import AddForm from "@/app/addData/page";
import { mockLocalStorage } from "../utils/test-helper/mockLocalStorage";

const { setItemMock } = mockLocalStorage();

describe("AddForm component", () => {
  it("should render the basic fields", () => {
    render(<AddForm />);
    expect(
      screen.getByRole("heading", { name: "Add New Food Data" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "Name" })).toBeInTheDocument();
    expect(
      screen.getByRole("textbox", { name: "Description" })
    ).toBeInTheDocument();
    expect(
      screen.getByRole("spinbutton", { name: "Rating" })
    ).toBeInTheDocument();
    expect(screen.getByRole("textbox", { name: "URL" })).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<AddForm />);

    fireEvent.change(screen.getByLabelText("Name"), {
      target: { value: "Sushi" },
    });
    fireEvent.change(screen.getByLabelText("Description"), {
      target: { value: "Test Description" },
    });
    fireEvent.change(screen.getByLabelText("URL"), {
      target: {
        value:
          "https://img.freepik.com/free-vector/asia-food-icon-set_1284-4192.jpg?w=996",
      },
    });
    fireEvent.change(screen.getByLabelText("Rating"), {
      target: { value: 4 },
    });

    fireEvent.click(screen.getByText("Submit"));

    const expectedData = JSON.parse(
      JSON.stringify({
        rating: 4,
        image_url:
          "https://img.freepik.com/free-vector/asia-food-icon-set_1284-4192.jpg?w=996",

        description: "Test Description",
        name: "Sushi",
      })
    );

    await waitFor(() => {
      expect(setItemMock).toHaveBeenCalledWith(
        "newData",
        JSON.stringify(expectedData)
      );
    });
    expect(screen.getByText("Data stored successfully")).toBeInTheDocument();
  });

  it("shows error messages for invalid data", async () => {
    render(<AddForm />);

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("Name is required")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Description is required")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("URL is required")).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText("Rating must be a number")).toBeInTheDocument();
    });
  });

  it("checks minimum input values for the rating field", async () => {
    render(<AddForm />);

    fireEvent.change(screen.getByLabelText("Rating"), {
      target: { value: 0 },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("Rating must be at least 1")).toBeInTheDocument();
    });
  });

  it("checks maximum input values for the rating field", async () => {
    render(<AddForm />);

    fireEvent.change(screen.getByLabelText("Rating"), {
      target: { value: 6 },
    });

    fireEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(screen.getByText("Rating must be at most 5")).toBeInTheDocument();
    });
  });
});

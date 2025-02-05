import { toast } from "sonner";
import { afterEach, describe, expect, it, vi } from "vitest";
import { validateTimerForm } from "../utils/validation";

vi.mock("sonner", () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe("validateTimerForm", () => {
  afterEach(() => {
    vi.clearAllMocks();
  });

  it("should return false if title is empty", () => {
    const result = validateTimerForm({
      title: "",
      description: "",
      hours: 1,
      minutes: 0,
      seconds: 0,
    });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Title is required");
  });

  it("should return false if title exceeds 50 characters", () => {
    const result = validateTimerForm({
      title: "a".repeat(51),
      description: "",
      hours: 1,
      minutes: 0,
      seconds: 0,
    });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Title must be less than 50 characters"
    );
  });

  it("should return false if any time value is negative", () => {
    const result = validateTimerForm({
      title: "Test",
      description: "",
      hours: -1,
      minutes: 0,
      seconds: 0,
    });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Time values cannot be negative");
  });

  it("should return false if minutes or seconds are greater than 59", () => {
    const result = validateTimerForm({
      title: "Test",
      description: "",
      hours: 0,
      minutes: 60,
      seconds: 0,
    });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Minutes and seconds must be between 0 and 59"
    );
  });

  it("should return false if total time is zero", () => {
    const result = validateTimerForm({
      title: "Test",
      description: "",
      hours: 0,
      minutes: 0,
      seconds: 0,
    });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith(
      "Please set a time greater than 0"
    );
  });

  it("should return false if timer exceeds 24 hours", () => {
    const result = validateTimerForm({
      title: "Test",
      description: "",
      hours: 25,
      minutes: 0,
      seconds: 0,
    });
    expect(result).toBe(false);
    expect(toast.error).toHaveBeenCalledWith("Timer cannot exceed 24 hours");
  });

  it("should return true for valid input", () => {
    const result = validateTimerForm({
      title: "Test",
      description: "",
      hours: 1,
      minutes: 30,
      seconds: 0,
    });
    expect(result).toBe(true);
    expect(toast.error).not.toHaveBeenCalled();
  });
});

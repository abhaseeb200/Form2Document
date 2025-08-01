import React from "react";
import { useForm } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

export default function App() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
    setError,
  } = useForm({
    defaultValues: {
      fullName: "",
      address: "",
      date: "",
      price: "",
    },
  });
  const [downloadUrl, setDownloadUrl] = React.useState("");

  const serverPort = http://localhost:3000;

  const onSubmit = async (data) => {
    try {
      const payload = {
        fullName: data.fullName.trim(),
        address: data.address.trim(),
        date: data.date,
        price: String(data.price),
      };

      const res = await fetch(`${serverPort}/generate-document`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const msg = await safeGetError(res);
        throw new Error(msg || "Failed to submit form.");
      }

      const response = await res.json();

      reset();
      toast.success(response?.message || "Document generated successfully!");
      setDownloadUrl(response?.filePath);
    } catch (err) {
      setError("root", { type: "server", message: err.message });
    }
  };

  const safeGetError = async (res) => {
    try {
      const data = await res.json();
      return data?.error || data?.message;
    } catch {
      return null;
    }
  };

  return (
    <>
      <Toaster position="top-center" />
      <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
        <div className="w-full max-w-md rounded-2xl bg-white shadow p-6">
          <h1 className="text-2xl font-semibold mb-1">Simple Order Form</h1>
          <p className="text-sm text-gray-500 mb-6">
            Please fill in the details and submit.
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="space-y-5"
          >
            {/* Full Name */}
            <div>
              <label htmlFor="fullName" className="block text-sm font-medium">
                Full Name
              </label>
              <input
                id="fullName"
                type="text"
                className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2
                ${
                  errors.fullName
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                placeholder="e.g., Abdul Haseeb"
                {...register("fullName", {
                  required: "Full name is required.",
                  minLength: {
                    value: 3,
                    message: "Must be at least 3 characters.",
                  },
                  pattern: {
                    value: /^[A-Za-zÀ-ÖØ-öø-ÿ'.\-\s]+$/,
                    message: "Only letters, spaces, and -.' are allowed.",
                  },
                })}
                aria-invalid={!!errors.fullName}
                aria-describedby="fullName-error"
                autoComplete="name"
              />
              {errors.fullName && (
                <p id="fullName-error" className="mt-1 text-sm text-red-600">
                  {errors.fullName.message}
                </p>
              )}
            </div>

            {/* Address */}
            <div>
              <label htmlFor="address" className="block text-sm font-medium">
                Address
              </label>
              <textarea
                id="address"
                rows="3"
                className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2
                ${
                  errors.address
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                placeholder="Street, City, Postal Code"
                {...register("address", {
                  required: "Address is required.",
                  minLength: {
                    value: 10,
                    message: "Please enter a more complete address.",
                  },
                })}
                aria-invalid={!!errors.address}
                aria-describedby="address-error"
                autoComplete="street-address"
              />
              {errors.address && (
                <p id="address-error" className="mt-1 text-sm text-red-600">
                  {errors.address.message}
                </p>
              )}
            </div>

            {/* Date */}
            <div>
              <label htmlFor="date" className="block text-sm font-medium">
                Date
              </label>
              <input
                id="date"
                type="date"
                className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2
                ${
                  errors.date
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                {...register("date", {
                  required: "Date is required.",
                })}
                aria-invalid={!!errors.date}
                aria-describedby="date-error"
              />
              {errors.date && (
                <p id="date-error" className="mt-1 text-sm text-red-600">
                  {errors.date.message}
                </p>
              )}
            </div>

            {/* Price */}
            <div>
              <label htmlFor="price" className="block text-sm font-medium">
                Price
              </label>
              <input
                id="price"
                type="number"
                step="0.01"
                inputMode="decimal"
                className={`mt-1 block w-full rounded-lg border px-3 py-2 focus:outline-none focus:ring-2
                ${
                  errors.price
                    ? "border-red-500 focus:ring-red-200"
                    : "border-gray-300 focus:ring-blue-200"
                }`}
                placeholder="e.g., 4999.99"
                {...register("price", {
                  required: "Price is required.",
                  valueAsNumber: true,
                  min: { value: 0.01, message: "Price must be at least 0.01." },
                  validate: (v) =>
                    Number.isFinite(v) && v > 0
                      ? true
                      : "Enter a valid positive number.",
                })}
                aria-invalid={!!errors.price}
                aria-describedby="price-error"
              />
              {errors.price && (
                <p id="price-error" className="mt-1 text-sm text-red-600">
                  {errors.price.message}
                </p>
              )}
            </div>

            {/* Server/Error message */}
            {errors.root && (
              <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700">
                {errors.root.message}
              </div>
            )}

            {/* Actions */}
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full rounded-lg bg-black px-4 py-2 text-white font-medium hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-black disabled:opacity-60"
            >
              {isSubmitting ? "Submitting..." : "Submit"}
            </button>

            {isSubmitSuccessful && !errors.root && (
              <>
                <p className="text-sm text-green-700">
                  Thanks! Your form was submitted.
                </p>
                {downloadUrl && (
                  <a
                    href={`${serverPort}${downloadUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-3 inline-block w-full rounded-lg bg-blue-600 px-4 py-2 text-white font-medium text-center hover:bg-blue-700"
                  >
                    Download Document
                  </a>
                )}
              </>
            )}
          </form>
        </div>
      </div>
    </>
  );
}

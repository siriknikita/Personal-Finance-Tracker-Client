import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components";
import { UserContext } from "../../../contexts";
import { fetchData, sendPostData } from "../../../services/dataProcessing";
import { transactionSchema } from "../schemas";

function TransactionForm() {
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(transactionSchema),
  });
  const navigate = useNavigate();

  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const responseData = await fetchData("categories/get", "categories");
      setCategories(responseData);
    };
    fetchCategories();
  }, []);

  const onSubmit = async (data) => {
    try {
      if (data.categoryID === "Choose a category") {
        setError("categoryID", {
          message: "Category is required",
        });
        return;
      }
      await sendPostData("transactions/add", {
        userID: user.userID,
        amount: data.amount,
        categoryID: data.categoryID,
      });
      navigate("/dashboard");
      toast.success("Transaction added successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to add transaction!");
      setError("amount", {
        message: "Failed to add transaction",
      });
    }
  };

  if (errors) {
    for (const error in errors) {
      toast.error(errors[error].message);
    }
  }

  return (
    <>
      <Helmet>
        <title>Add a transaction</title>
      </Helmet>
      <Header
        title="Add a transaction"
        subtitle="Enter your transaction details"
      />
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col gap-4">
          {/* Choose a category */}
          <select
            {...register("categoryID", {
              required: "Category is required",
            })}
            className="select select-bordered w-full max-w-xs ml-2"
          >
            <option disabled selected>
              Choose a category
            </option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.name}
              </option>
            ))}
          </select>
          {/* Amount */}
          <label className="input input-bordered flex items-center gap-2 shrink">
            Enter amount of money ($):
            <input
              {...register("amount", {
                required: "Amount is required",
              })}
              type="number"
              className="m-1"
              placeholder="Amount"
              disabled={isSubmitting}
            />
          </label>
          {/* Submit button */}
          <button
            disabled={isSubmitting}
            className="btn btn-neutral w-32 max-w-36"
            type="submit"
          >
            {isSubmitting ? "Adding transaction..." : "Add transaction"}
          </button>
        </div>
      </form>
    </>
  );
}

export default TransactionForm;

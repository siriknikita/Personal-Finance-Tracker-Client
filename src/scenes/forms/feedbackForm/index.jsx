import { zodResolver } from "@hookform/resolvers/zod";
import React, { useContext } from "react";
import { Helmet } from "react-helmet";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Header } from "../../../components";
import { UserContext } from "../../../contexts";
import { sendPostData } from "../../../services/dataProcessing";
import { feedbackSchema } from "../../forms/schemas";

function FeedbackForm() {
  const { user } = useContext(UserContext);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(feedbackSchema),
  });
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      console.log(data);
      await sendPostData("email/feedback", {
        feedback: data.feedback,
        userEmail: user.email,
      });
      navigate("/dashboard");
      toast.success("Feedback sent successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to send feedback!");
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
        <title>Goal Form</title>
      </Helmet>
      <Header title="Add a goal" subtitle="Enter your goal details" />
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col p-4 items-center justify-center"
      >
        <div className="flex flex-col w-[70%] items-center">
          <div className="grow w-[100%]">
            <label className="form-control">
              <div className="label">
                <span className="label-text">Your Feedback Here:</span>
              </div>
              <textarea
                {...register("feedback", {
                  required: "Feedback is required",
                })}
                className="textarea textarea-bordered h-24"
                placeholder="Feedback here"
              ></textarea>
            </label>
            {/* <label className="input input-bordered flex items-center gap-2 m-4">
              Goal
              <input
                {...register("goal", {
                  required: "Goal description is required",
                })}
                type="text"
                className="grow"
                placeholder="Goal Description"
              />
            </label>
            <label className="input input-bordered flex items-center gap-2 m-4">
              Deadline
              <input
                {...register("deadline", {
                  required: "Deadline is required",
                })}
                type="date"
                min={new Date().toISOString().split("T")[0]}
                className="grow"
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </label> */}
          </div>
          <button
            disabled={isSubmitting}
            className="btn btn-neutral w-32 max-w-36 mt-4"
            type="submit"
          >
            {isSubmitting ? "Adding feedback..." : "Add feedback"}
          </button>
        </div>
      </form>
    </>
  );
}

export default FeedbackForm;

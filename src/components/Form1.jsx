import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

export default function Form1() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.post("http://localhost:5000/", {
        title: data.title,
        description: data.content,
      });
      console.log("Form submitted successfully:", response.data);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Failed to submit the form. Please try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Blog Title Input */}
      <label htmlFor="title">Blog Title:</label>
      <input
        id="title"
        placeholder="Enter blog title"
        {...register("title", { required: "Blog title is required" })}
      />
      {errors.title && <span style={{ color: "red" }}>{errors.title.message}</span>}
      {/* <br />
      <br /> */}

      {/* Blog Content Textarea */}
      <label htmlFor="description">Blog Content:</label>
      <textarea
        id="description"
        placeholder="Enter your description..."
        {...register("content", { required: "Blog content is required" })}
      />
      {errors.content && <span style={{ color: "red" }}>{errors.content.message}</span>}
      <br />
      <br />

      {/* Submit Button */}
      <button type="submit">Submit</button>
    </form>
  );
}

"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import style from "./addForm.module.css";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onShowError, onShowSuccess } from "../../../utils/toastHelper";

const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  image_url: yup.string().url("Invalid URL").required("URL is required"),
  rating: yup
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .typeError("Rating must be a number"),
});

export default function AddForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    if (errors.name) { onShowError(errors.name.message)
    }
    if (errors.description) {
      onShowError(errors.description.message)
    }
    if (errors.image_url) {
      onShowError(errors.image_url.message)
    }
    if (errors.rating) {
      onShowError(errors.rating.message)
    }
  }, [errors.name, errors.description, errors.image_url, errors.rating]);

  const onSubmit = (data: any) => {
    try {
      localStorage.setItem("newData", JSON.stringify(data));
      onShowSuccess("Data stored successfully")
    } catch (error) {
      onShowError("Failed to store data. Please try again.")
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
       <h1 className="text-center">Add New Food Data</h1>
       
        <label htmlFor="name">Name</label>
        <input className={style.formInput} type="text" {...register("name")} id="name"/>

        <label htmlFor="description">Description</label>
        <textarea
          className={style.formInput}
          {...register("description")}
          id="description"
        />

        <label htmlFor="image_url">URL</label>
        <input
          className={style.formInput}
          type="text"
          {...register("image_url")}
          id="image_url"
        />

        <label htmlFor="rating">Rating</label>
        <input
          className={style.formInput}
          type="number"
          {...register("rating")}
          id="rating"
        />

    <div className={style.btnContainer}>
    <button className={style.formButton}>
          <Link href="/">Go Back</Link>
        </button>
        <button  className={style.formButton}type="submit">Submit</button>
    </div>
        
      </form>
    </>
  );
}

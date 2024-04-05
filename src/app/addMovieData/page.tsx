"use client";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import style from "./addForm.module.css";
import Link from "next/link";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useEffect } from "react";
import { onShowError, onShowSuccess } from "../../../utils/toastHelper";

const schema = yup.object().shape({
  title: yup.string().required("Title is required"),
  overview: yup.string().required("Overview is required"),
  poster_path: yup.string().url("Invalid URL").required("URL is required"),
  popularity: yup.number().typeError("Popularity must be a number"),
  phoneNumber: yup
    .string()
    .matches(/^\d{11}$/, "Phone must be 11 digit.")
    .required("Phone Number is required"),
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
    if (errors.title) {
      onShowError(errors.title.message);
    }
    if (errors.overview) {
      onShowError(errors.overview.message);
    }
    if (errors.poster_path) {
      onShowError(errors.poster_path.message);
    }
    if (errors.popularity) {
      onShowError(errors.popularity.message);
    }

    if (errors.phoneNumber) {
      onShowError(errors.phoneNumber.message);
    }
  }, [
    errors.title,
    errors.overview,
    errors.poster_path,
    errors.popularity,
    errors.phoneNumber,
  ]);

  const onSubmit = (data: any) => {
    try {
      console.log("data", data);
      localStorage.setItem(
        "newData",
        JSON.stringify(data)
      );
      onShowSuccess("Data stored successfully");
    } catch (error) {
      onShowError("Failed to store data. Please try again.");
    }
  };

  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
        <h1 className="text-center">Add New Movie Data</h1>

        <label htmlFor="title">Title</label>
        <input className={style.formInput} type="text" {...register("title")} />

        <label htmlFor="overview">Overview</label>
        <textarea className={style.formInput} {...register("overview")} />

        <label htmlFor="poster_path">URL</label>
        <input
          className={style.formInput}
          type="text"
          {...register("poster_path")}
        />

        <label htmlFor="popularity">Rating</label>
        <input
          className={style.formInput}
          type="number"
          {...register("popularity")}
        />

        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          className={style.formInput}
          type="number"
          {...register("phoneNumber")}
        />

        <div className={style.btnContainer}>
          <button className={style.formButton}>
            <Link href="/movie">Go Back</Link>
          </button>
          <button className={style.formButton} type="submit">
            Submit
          </button>
        </div>
      </form>
    </>
  );
}

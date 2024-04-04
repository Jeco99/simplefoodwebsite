"use client"

import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"
import * as yup from "yup"
import style from './addForm.module.css';
import Link from "next/link";

const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    description: yup.string().required("Description is required"),
    image_url: yup.string().url("Invalid URL").required("URL is required"),
    rating: yup
      .number()
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5")
      .required("Rating is required")
  });


export default function AddForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  })



  const onSubmit = (data: any) => {
    console.log(data);
    try {
      localStorage.setItem("newData", JSON.stringify(data));
      console.log("Data stored successfully");
    } catch (error) {
      console.error("Error storing data:", error);
    }
  };
  


  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.formContainer}>
    <label htmlFor="name">Name</label>
    <input className={style.formInput} type="text" {...register("name")} />
    {errors.name && <span>{errors.name.message}</span>}

    <label htmlFor="description">Description</label>
    <input className={style.formInput} type="text" {...register("description")} />
    {errors.description && <span>{errors.description.message}</span>}

    <label htmlFor="url">URL</label>
    <input className={style.formInput} type="text" {...register("image_url")} />
    {errors.image_url && <span>{errors.image_url.message}</span>}

    <label htmlFor="rating">Rating</label>
    <input className={style.formInput} type="number" {...register("rating")} />
    {errors.rating && <span>{errors.rating.message}</span>}

    <button type="submit">Submit</button>
    <button><Link href="/">Bo Back</Link></button>
  </form>
  )
}
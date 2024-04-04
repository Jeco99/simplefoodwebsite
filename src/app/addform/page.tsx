"use client";
import { useForm, SubmitHandler } from "react-hook-form";
import { CardDatatype } from "../../../component/dataInterface";
import style from "./addform.module.css";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { AddFormProps } from "../../../component/dataInterface";

const schema = yup.object({
  name: yup.string().required("Name is required"),
  description: yup.string().required("Description is required"),
  image_url: yup.string().url("Invalid URL").required("URL is required"),
  rating: yup
    .number()
    .min(1, "Rating must be at least 1")
    .max(5, "Rating must be at most 5")
    .required("Rating is required"),
});

export default function AddForm({
  filteredData,
  setFilteredData,
  setShowModal,
}: AddFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
    watch
  } = useForm({
    resolver: yupResolver(schema),
  });

 console.log(watch())
  const onSubmit: SubmitHandler<CardDatatype> = (data) => {
      console.log(data);
    const updatedFoodData = [...filteredData, data];
    setFilteredData(updatedFoodData);
    console.log(updatedFoodData);
  };

  return (
    <div className={style.modalBackground}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.formData}>
        <label className={style.labelForm} htmlFor="name">
          Name
        </label>
        <input type="text" className={style.userInput} {...register("name")} />
     {errors.name && <span>{errors.name.message}</span>}
        <label className={style.labelForm} htmlFor="description">
          Description
        </label>
        <input
          type="text"
          className={style.userInput}
          {...register("description")}
        />
        {errors.description && <span>{errors.description.message}</span>}

        <label className={style.labelForm} htmlFor="url">
          URL
        </label>
        <input
          type="text"
          className={style.userInput}
          {...register("image_url")}
        />
        {errors.image_url && <span>{errors.image_url.message}</span>}

        <label className={style.labelForm} htmlFor="rating">
          Rating
        </label>
        <input
          type="number"
          className={style.userInput}
          {...register("rating")}
        />
        {errors.rating && <span>{errors.rating.message}</span>}
        <div className={style.buttonContainer}>
          <button
            className={style.formButton}
            onClick={() => setShowModal(false)}
          >
            Close
          </button>
          <button className={style.formButton} type="submit">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}

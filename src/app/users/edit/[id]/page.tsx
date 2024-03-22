"use client";

import { useNavigation, useSelect } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import React from "react";
import * as yup from "yup";


const schema = yup
  .object()
  .shape({
    firstName: yup.string().required('First name is required'),
    lastName: yup.string().required('Last name is required'),
    phone: yup.string(),
    role: yup.string(),
  })
  .required()

export default function BlogPostCreate() {
  const { list, edit } = useNavigation();

  const {
    refineCore: { onFinish, id, queryResult },
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //const blogPostsData = queryResult?.data?.data;

  // const { options: categoryOptions } = useSelect({
  //   resource: "categories",
  //   defaultValue: blogPostsData?.category?.id,
  // });
  //
  // React.useEffect(() => {
  //   setValue("category.id", blogPostsData?.category?.id);
  // }, [categoryOptions]);

  return (
    <div style={{ padding: "16px" }}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <h1>Edit</h1>
        <div>
          <button
            onClick={() => {
              list("users");
            }}
          >
            List
          </button>
          <button
            onClick={() => {
              edit("user-role", id!);
            }}
          >
            Edit role
          </button>
        </div>
      </div>
      <form onSubmit={handleSubmit(onFinish)}>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "8px",
          }}
        >
          <label>
            <span style={{ marginRight: "8px" }}>First name</span>
            <input
              type="text"
              {...register("firstName", {
                required: "This field is required",
              })}
            />
            <div style={{ color: "red" }}>
              {(errors as any)?.firstName?.message as string}
            </div>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Last name</span>
            <input
              type="text"
              {...register("lastName", {
                required: "This field is required",
              })}
            />
            <div style={{ color: "red" }}>
              {(errors as any)?.lastName?.message as string}
            </div>
          </label>
          <label>
            <span style={{ marginRight: "8px" }}>Phone</span>
            <input
              type="text"
              {...register("phone", {
                required: "This field is required",
                disabled: true,
              })}
            />
            <div style={{ color: "red" }}>
              {(errors as any)?.phone?.message as string}
            </div>
          </label>

          <label>
            <span style={{ marginRight: "8px" }}>Role</span>
            <select
              defaultValue={"user"}
              {...register("role", {
                required: "This field is required",
                disabled: true,
              })}
            >
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
            <div style={{ color: "red" }}>
              {(errors as any)?.role?.message as string}
            </div>
          </label>
          <div>
            <input type="submit" value="Save" />
          </div>
        </div>
      </form>
    </div>
  );
}

"use client";

import { useNavigation, useOne, useResource, useShow } from "@refinedev/core";

export default function BlogPostShow() {
  const { edit, list } = useNavigation();
  const { id } = useResource();
  const { queryResult } = useShow({});
  const { data } = queryResult;
  const record = data?.data;

  return (
    <div style={{ padding: "16px" }}>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h1>{"Show"}</h1>
        <div style={{ display: "flex", gap: "8px" }}>
          <button onClick={() => list("users")}>{"List"}</button>
          <button onClick={() => edit("users", id ?? "")}>{"Edit"}</button>
        </div>
      </div>
      <div>
        <div style={{ marginTop: "6px" }}>
          <h5>{"ID"}</h5>
          <div>{record?.userId ?? ""}</div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>{"First nanme"}</h5>
          <div>{record?.firstName}</div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>{"Last name"}</h5>
          <p>{record?.lastName}</p>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>{"Phone"}</h5>
          <p>{record?.phone}</p>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>{"Role"}</h5>
          <div>{record?.role}</div>
        </div>
        <div style={{ marginTop: "6px" }}>
          <h5>{"Created at"}</h5>
          <div>
            {new Date(record?.createdAt).toLocaleString(undefined, {
              timeZone: "UTC",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useTestPrivateRotureQuery } from "@/entities/auth";

export const Test = () => {
  const { data } = useTestPrivateRotureQuery();

  return <div>{data?.message}</div>;
};

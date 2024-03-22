"use client";

import { dataProvider as dataProviderSimpleRest } from "../rest-data-provider";

const API_URL = process.env.NEXT_PUBLIC_BASE_API_URL;

export const dataProvider = dataProviderSimpleRest(API_URL);

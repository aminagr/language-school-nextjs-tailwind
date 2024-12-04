"use client";

import { useState, useEffect } from "react";
import Sessions from "@/components/admin/Sessions";
import Link from "next/link";
import { useLocale } from "next-intl";


const RoomsPage = () => {
const locale = useLocale();

  return (
    <div>
<Sessions/>

    </div>
  );
};

export default RoomsPage;

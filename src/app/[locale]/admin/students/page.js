"use client";

import { useState, useEffect } from "react";
import Students from "@/components/admin/Students";
import Link from "next/link";
import { useLocale } from "next-intl";


const StudentsPage = () => {
const locale = useLocale();

  return (
    <div>
<Students/>

    </div>
  );
};

export default StudentsPage;

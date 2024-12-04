"use client";

import { useState, useEffect } from "react";
import Groups from "@/components/admin/Groups";
import Link from "next/link";
import { useLocale } from "next-intl";


const GroupsPage = () => {
const locale = useLocale();

  return (
    <div>
    <Groups/>

    </div>
  );
};

export default GroupsPage;

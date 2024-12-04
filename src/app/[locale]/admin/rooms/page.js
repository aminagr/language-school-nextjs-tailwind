"use client";

import { useState, useEffect } from "react";
import Room from "@/components/admin/Rooms";
import Link from "next/link";
import { useLocale } from "next-intl";


const RoomsPage = () => {
const locale = useLocale();

  return (
    <div>
<Room/>

    </div>
  );
};

export default RoomsPage;

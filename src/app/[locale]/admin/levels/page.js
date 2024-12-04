"use client";

import { useState, useEffect } from "react";
import Room from "@/components/admin/Rooms";
import Link from "next/link";
import { useLocale } from "next-intl";
import Levels from "@/components/admin/Levels";

const LevelsPage = () => {
const locale = useLocale();

  return (
    <div>
<Levels/>

    </div>
  );
};

export default LevelsPage;

"use client";

import { useState, useEffect } from "react";
import Registrations from "@/components/admin/Registrations";
import Link from "next/link";
import { useLocale } from "next-intl";


const RegistrationsPage = () => {
const locale = useLocale();

  return (
    <div>
<Registrations/>

    </div>
  );
};

export default RegistrationsPage;

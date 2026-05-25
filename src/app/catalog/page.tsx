import { Suspense } from "react";
import { CatalogView } from "@/components/catalog/catalog-view";

export const metadata = {
  title: "Каталог — PURRMURE",
};

export default function CatalogPage() {
  return (
    <Suspense fallback={<div className="mx-auto w-full max-w-[1280px] px-4 md:px-8 py-8" />}>
      <CatalogView />
    </Suspense>
  );
}

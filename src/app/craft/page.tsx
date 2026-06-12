import CraftClient from "./CraftClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function CraftPage() {
  let cmsImages: any[] = [];
  try {
    cmsImages = await prisma.websiteImage.findMany({
      where: { page: "craft" }
    });
  } catch (err) {
    console.error("Failed to fetch database items for Craft page:", err);
  }

  const cmsImageMap = cmsImages.reduce((acc, img) => {
    acc[img.key] = img;
    return acc;
  }, {} as Record<string, typeof cmsImages[0]>);

  return <CraftClient cmsImageMap={cmsImageMap} />;
}

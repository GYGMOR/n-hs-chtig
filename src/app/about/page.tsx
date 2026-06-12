import AboutClient from "./AboutClient";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

export default async function AboutPage() {
  let cmsImages: any[] = [];
  try {
    cmsImages = await prisma.websiteImage.findMany({
      where: { page: "about" }
    });
  } catch (err) {
    console.error("Failed to fetch database items for About page:", err);
  }

  const cmsImageMap = cmsImages.reduce((acc, img) => {
    acc[img.key] = img;
    return acc;
  }, {} as Record<string, typeof cmsImages[0]>);

  return <AboutClient cmsImageMap={cmsImageMap} />;
}

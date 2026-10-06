import { HeroSection } from "@/components/portfolio/template2/HeroSection";
import { GallerySection } from "@/components/portfolio/template2/GallerySection";

export default function DesignerPreview() {
  const mockUser = {
    name: "Alex Design",
    profile: {
      bio: "Creating bold, interactive digital experiences with a focus on modern typography and fluid layouts."
    }
  };

  return (
    <main className="min-h-screen">
      <HeroSection user={mockUser} />
      <GallerySection />
    </main>
  );
}

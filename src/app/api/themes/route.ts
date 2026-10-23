import { NextResponse } from "next/server";
import { getAllSystemThemes, filterThemes, getThemeById } from "@/lib/themes/registry";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");
    const category = searchParams.get("category");
    const mood = searchParams.get("mood");

    if (id) {
      const theme = getThemeById(id);
      return NextResponse.json({ theme });
    }

    const themes = filterThemes({
      category: category || undefined,
      mood: mood || undefined,
    });

    return NextResponse.json({
      count: themes.length,
      themes,
    });
  } catch (error: any) {
    console.error("Themes API Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to load themes" },
      { status: 500 }
    );
  }
}

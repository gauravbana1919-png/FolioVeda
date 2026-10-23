import { NextResponse } from "next/server";
import prisma from "@/lib/db";
import { TakedownReportInputSchema } from "@/types/inspiration";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const parseResult = TakedownReportInputSchema.safeParse(body);

    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Invalid report data", details: parseResult.error.flatten() },
        { status: 400 }
      );
    }

    const { reportedUrl, reporterEmail, reason } = parseResult.data;

    const report = await prisma.takedownReport.create({
      data: {
        reportedUrl,
        reporterEmail,
        reason,
        status: "open",
      },
    });

    return NextResponse.json({
      success: true,
      reportId: report.id,
      message: "Takedown report successfully filed. Our legal and compliance team investigates all submissions within 24 business hours.",
    });
  } catch (error: any) {
    console.error("Takedown Report Error:", error);
    return NextResponse.json(
      { error: error.message || "Failed to submit takedown report" },
      { status: 500 }
    );
  }
}

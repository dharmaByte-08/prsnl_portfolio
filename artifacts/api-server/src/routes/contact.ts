import { Router, type IRouter } from "express";
import { db, contactSubmissionsTable } from "@workspace/db";
import { SubmitContactBody } from "@workspace/api-zod";

const router: IRouter = Router();

// POST /contact — save a contact form submission
// GET /contact is intentionally omitted: it contains PII and has no auth layer.
router.post("/contact", async (req, res): Promise<void> => {
  const parsed = SubmitContactBody.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid request", details: parsed.error.flatten().fieldErrors });
    return;
  }

  try {
    const [submission] = await db
      .insert(contactSubmissionsTable)
      .values({
        name: parsed.data.name,
        email: parsed.data.email,
        phone: parsed.data.phone ?? null,
        subject: parsed.data.subject,
        message: parsed.data.message,
      })
      .returning();

    req.log.info({ id: submission.id }, "Contact submission saved");

    res.status(201).json({ id: submission.id });
  } catch (err) {
    req.log.error({ err }, "Failed to save contact submission");
    res.status(500).json({ error: "Failed to save submission. Please try again." });
  }
});

export default router;

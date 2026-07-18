import { useState } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import emailjs from "@emailjs/browser";
import { Phone, Mail, Github, Linkedin, Instagram, Send, CheckCircle, AlertCircle } from "lucide-react";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  phone: z.string().optional(),
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type FormValues = z.infer<typeof formSchema>;

type SubmitState = "idle" | "submitting" | "success" | "error";

export function Contact() {
  const [submitState, setSubmitState] = useState<SubmitState>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormValues) => {
    setSubmitState("submitting");
    setErrorMsg("");

    try {
      // 1. Save to database — this is the primary success signal
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone || null,
          subject: data.subject,
          message: data.message,
        }),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error((body as { error?: string }).error ?? `Server error ${res.status}`);
      }

      // 2. Send email via EmailJS — best-effort, non-blocking
      const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
      const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
      const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

      if (serviceId && templateId && publicKey) {
        emailjs
          .send(
            serviceId,
            templateId,
            {
              from_name: data.name,
              from_email: data.email,
              phone: data.phone || "Not provided",
              subject: data.subject,
              message: data.message,
              to_name: "Dharmendra Kanzariya",
            },
            { publicKey },
          )
          .catch((err) => console.warn("EmailJS send failed (non-fatal):", err));
      }

      // DB saved — declare success regardless of email outcome
      setSubmitState("success");
      reset();
      setTimeout(() => setSubmitState("idle"), 6000);
    } catch (err) {
      setSubmitState("error");
      const msg = err instanceof Error ? err.message : "Something went wrong.";
      setErrorMsg(`${msg} Please try again or reach out directly via email.`);
      setTimeout(() => setSubmitState("idle"), 5000);
    }
  };

  const contactLinks = [
    { icon: Phone, label: "+91 9510735272", href: "tel:+919510735272" },
    { icon: Mail, label: "dharmendratech08@gmail.com", href: "mailto:dharmendratech08@gmail.com" },
    { icon: Github, label: "dharmaByte-08", href: "https://github.com/dharmaByte-08" },
    { icon: Linkedin, label: "dharmendra-kanzariya", href: "https://www.linkedin.com/in/dharmendra-kanzariya-50b2a3406?utm_source=share_via&utm_content=profile&utm_medium=member_android" },
    { icon: Instagram, label: "@mr.dharmendra.08", href: "https://www.instagram.com/mr.dharmendra.08?igsh=MW16aDU5aTNieDZ4dw==" },
    // { icon: Send, label: "t.me/jonstark", href: "https://t.me" },
  ];

  return (
    <section id="contact" className="py-24 md:py-20 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Get In Touch</h2>
          <div className="w-12 h-1 bg-primary mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-24">
          {/* Contact details */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 space-y-8"
          >
            <p className="text-muted-foreground text-lg mb-8">
              Currently open for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!
            </p>

            <div className="space-y-6">
              {contactLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group"
                >
                  <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                    <link.icon className="w-5 h-5 group-hover:text-primary" />
                  </div>
                  <span className="font-medium">{link.label}</span>
                </a>
              ))}
            </div>
          </motion.div>

          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-7 bg-card border border-border p-8 md:p-10 rounded-xl shadow-sm"
          >
            {submitState === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center space-y-4"
              >
                <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center text-primary mb-4">
                  <CheckCircle className="w-10 h-10" />
                </div>
                <h3 className="text-2xl font-display font-bold">Message Sent!</h3>
                <p className="text-muted-foreground">Thanks for reaching out. I'll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium text-foreground">Name</label>
                    <input
                      {...register("name")}
                      id="name"
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="John Doe"
                    />
                    {errors.name && <span className="text-xs text-destructive">{errors.name.message}</span>}
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium text-foreground">Email</label>
                    <input
                      {...register("email")}
                      id="email"
                      type="email"
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="john@example.com"
                    />
                    {errors.email && <span className="text-xs text-destructive">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="phone" className="text-sm font-medium text-foreground">Phone (Optional)</label>
                    <input
                      {...register("phone")}
                      id="phone"
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="+1 (555) 000-0000"
                    />
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="subject" className="text-sm font-medium text-foreground">Subject</label>
                    <input
                      {...register("subject")}
                      id="subject"
                      className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors"
                      placeholder="Project Inquiry"
                    />
                    {errors.subject && <span className="text-xs text-destructive">{errors.subject.message}</span>}
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium text-foreground">Message</label>
                  <textarea
                    {...register("message")}
                    id="message"
                    rows={5}
                    className="w-full bg-background border border-border rounded-md px-4 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                  {errors.message && <span className="text-xs text-destructive">{errors.message.message}</span>}
                </div>

                {submitState === "error" && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-start gap-3 p-4 rounded-md bg-destructive/10 border border-destructive/20 text-destructive text-sm"
                  >
                    <AlertCircle className="w-4 h-4 mt-0.5 shrink-0" />
                    <span>{errorMsg}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={submitState === "submitting"}
                  className="w-full bg-primary text-primary-foreground font-medium py-4 rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {submitState === "submitting" ? (
                    <>
                      <div className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      Send Message
                      <Send className="w-4 h-4 ml-2" />
                    </>
                  )}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

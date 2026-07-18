import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Github, Linkedin, Instagram, Send, Mail } from "lucide-react";
import avatarUrl from "@assets/generated_images/avatar.jpeg";

export function Hero() {
  const [text, setText] = useState("");
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  const phrases = [
    "Laravel Developer",
    "Backend Engineer",
    "PHP Developer",
    "Web Application Builder",
  ];

  useEffect(() => {
    const typingSpeed = isDeleting ? 50 : 100;
    const currentPhrase = phrases[phraseIndex];

    const timeout = setTimeout(() => {
      if (!isDeleting && text === currentPhrase) {
        setTimeout(() => setIsDeleting(true), 1500);
        return;
      }

      if (isDeleting && text === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }

      setText((prev) =>
        isDeleting
          ? prev.slice(0, -1)
          : currentPhrase.slice(0, prev.length + 1)
      );
    }, typingSpeed);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, phraseIndex]);

  const scrollToProjects = () => {
    document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
  };

  const socialLinks = [
    { icon: Github, href: "https://github.com/dharmaByte-08", label: "GitHub" },
    { icon: Linkedin, href: "https://www.linkedin.com/in/dharmendra-kanzariya-50b2a3406?utm_source=share_via&utm_content=profile&utm_medium=member_android", label: "LinkedIn" },
    { icon: Instagram, href: "https://www.instagram.com/mr.dharmendra.08?igsh=MW16aDU5aTNieDZ4dw==", label: "Instagram" },
    // { icon: Send, href: "https://t.me", label: "Telegram" },
    { icon: Mail, href: "mailto:dharmendratech08@gmail.com", label: "Email" },
  ];

  return (
    <section
      id="home"
      className="relative min-h-[100dvh] flex flex-col justify-center items-center overflow-hidden pt-15"
    >
      {/* Background elements */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-[50vw] h-[50vw] bg-primary/5 rounded-full blur-[100px] mix-blend-screen" />
        <div className="absolute bottom-1/4 right-1/4 w-[40vw] h-[40vw] bg-primary/10 rounded-full blur-[120px] mix-blend-screen" />
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 bg-[linear-gradient(to_right,#8882_1px,transparent_1px),linear-gradient(to_bottom,#8882_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,#000_20%,transparent_100%)] opacity-20"
        />
      </div>

      <div className="container relative z-10 px-6 max-w-4xl mx-auto flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8 relative"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden border-2 border-border relative z-10 bg-card">
            <img 
              src={avatarUrl} 
              alt="Dharmendra Kanzariya" 
              className="w-full h-full"
              onError={(e) => {
                e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23aaa"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>';
                e.currentTarget.className = "w-full h-full object-cover p-4 opacity-50";
              }}
            />
          </div>
          <div className="absolute inset-0 rounded-full border border-primary/50 animate-ping opacity-20" style={{ animationDuration: '3s' }} />
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-4xl md:text-6xl font-display font-bold mb-4 tracking-tight"
        >
          Dharmendra Kanzariya
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="h-6 md:h-8 mb-6 flex items-center justify-center"
        >
          <span className="text-xl md:text-3xl text-primary font-medium tracking-wide">
            {text}
            <span className="animate-pulse ml-1 inline-block w-2 h-6 md:h-8 bg-primary align-middle" />
          </span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-lg text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Result - driven Full Stack Developer with 2 years of excperience in developing scalable web applications using Laravel, PHP, MYSQL, and modern frontend technologies. Experianced in ERP 
          systems, Job Portal and CRM management applications with Rest APIs, authentication and responsive UI. Passionate about writing clean, maintainable code and solving real-world business problems.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mb-12"
        >
          <button 
            onClick={scrollToProjects}
            className="px-8 py-4 bg-primary text-primary-foreground font-medium rounded-md hover:bg-primary/90 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background"
          >
            View Projects
          </button>
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 bg-transparent border border-border text-foreground font-medium rounded-md hover:border-primary hover:text-primary transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2 focus:ring-offset-background inline-flex items-center justify-center"
          >
            Resume
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex items-center gap-6"
        >
          {socialLinks.map((social) => (
            <a
              key={social.label}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="text-muted-foreground hover:text-primary transition-colors focus:outline-none focus:text-primary"
            >
              <social.icon className="w-6 h-6" />
            </a>
          ))}
        </motion.div>
      </div>

    </section>
  );
}

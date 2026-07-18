import { motion } from "framer-motion";

export function About() {
  const stats = [
    { value: "2+", label: "Years Experience" },
    { value: "Laravel", label: "Specialization" },
    { value: "23", label: "Years Old" },
  ];

  return (
    <section id="about" className="py-24 md:py-20 relative border-t border-border/50 bg-background/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">About Me</h2>
          <div className="w-12 h-1 bg-primary mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-24 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7 space-y-6 text-muted-foreground text-lg leading-relaxed"
          >
            <p>
            I am a passionate Full Stack Developer with over 2 years of professional experience in designing and developing scalable web applications. My primary expertise lies in Laravel, PHP, MySQL, JavaScript, and modern frontend technologies, where I focus on creating secure, efficient, and user-friendly solutions.
            </p>
            <p>
            Throughout my journey, I have worked on ERP systems, CRM platforms, Job Portals, Document Management Systems, and custom business applications. I enjoy transforming complex business requirements into practical software that improves productivity and simplifies workflows.
            </p>
            <p>
            I believe that great software is more than writing code—it is about understanding problems, choosing the right architecture, and delivering maintainable solutions that provide long-term value.
            </p>
            <p>
            I continuously explore new technologies and best practices to improve my development skills and build modern, high-performance applications.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-5 grid gap-6"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.5, delay: 0.3 + i * 0.1 }}
                className="bg-card border border-card-border p-6 rounded-lg flex items-center justify-between group hover:border-primary/50 transition-colors"
              >
                <span className="text-muted-foreground font-medium text-sm uppercase tracking-wider">{stat.label}</span>
                <span className="text-3xl font-display font-bold text-foreground group-hover:text-primary transition-colors">{stat.value}</span>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

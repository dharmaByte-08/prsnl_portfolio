import { motion } from "framer-motion";
import { ExternalLink, Github } from "lucide-react";
import expenseImg from "@assets/generated_images/project_expense.jpg";
import stockImg from "@assets/generated_images/project_stock.jpg";
import jobImg from "@assets/generated_images/project_job.jpg";
import erpImg from "@assets/generated_images/project_erp.jpg";
import docImg from "@assets/generated_images/project_doc.jpg";

export function Projects() {
  const projects = [
    {
      title: "Expense Management",
      type: "Personal Project" as const,
      description: "Personal finance and expense tracking system with detailed analytics and categorizations.",
      stack: ["Laravel", "PHP", "MySQL", "Blade", "Tailwind"],
      image: expenseImg,
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      title: "Stock Management",
      type: "Professional" as const,
      description: "Comprehensive inventory and stock tracking platform with real-time updates and low-stock alerts.",
      stack: ["Laravel", "Livewire", "MySQL", "Blade", "Tailwind"],
      image: stockImg,
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      title: "Job Portal",
      type: "Professional" as const,
      description: "Full-featured employment platform connecting recruiters with candidates, featuring application workflows.",
      stack: ["Laravel", "Livewire", "MySQL", "Blade", "Tailwind"],
      image: jobImg,
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      title: "ERP SaaS Product",
      type: "Professional" as const,
      description: "Enterprise resource planning solution designed for small to medium businesses to manage their operations.",
      stack: ["Laravel", "Livewire", "MySQL", "JavaScript", "CSS"],
      image: erpImg,
      github: "https://github.com",
      live: "https://example.com"
    },
    {
      title: "Document Management",
      type: "Professional" as const,
      description: "Digital document organization and workflow system with role-based access control and versioning.",
      stack: ["Laravel", "PHP", "MySQL", "Livewire", "Bootstrap"],
      image: docImg,
      github: "https://github.com",
      live: "https://example.com"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" as const } }
  };

  return (
    <section id="projects" className="py-24 md:py-20 relative bg-background/50 border-t border-border/50">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Selected Works</h2>
          <div className="w-12 h-1 bg-primary mt-6"></div>
        </motion.div>

        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
        >
          {projects.map((project) => (
            <motion.div 
              key={project.title}
              variants={itemVariants}
              className="group bg-card border border-border rounded-lg overflow-hidden hover:border-primary/40 hover:shadow-[0_0_30px_rgba(163,230,53,0.05)] transition-all duration-300 flex flex-col h-full"
            >
              <div className="aspect-[4/3] overflow-hidden relative border-b border-border">
                <div className="absolute inset-0 bg-primary/10 mix-blend-overlay opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
                <img 
                  src={project.image} 
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  onError={(e) => {
                    e.currentTarget.src = 'data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 800 600" fill="%231a1a1a"><rect width="800" height="600" fill="%23111"/><text x="400" y="300" font-family="sans-serif" font-size="24" fill="%23444" text-anchor="middle" dominant-baseline="middle">Project Screenshot</text></svg>';
                  }}
                />
              </div>
              
              <div className="p-6 flex flex-col flex-grow">
                <div className="flex items-center gap-3 mb-2 flex-wrap">
                  <h3 className="text-xl font-display font-bold group-hover:text-primary transition-colors">{project.title}</h3>
                  <span
                    className={`text-[10px] font-mono uppercase tracking-wider px-2 py-1 rounded border ${
                      project.type === "Personal Project"
                        ? "bg-primary/10 text-primary border-primary/40"
                        : "bg-secondary text-secondary-foreground border-border"
                    }`}
                  >
                    {project.type}
                  </span>
                </div>
                <p className="text-muted-foreground text-sm mb-6 flex-grow">{project.description}</p>
                
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.stack.map(tech => (
                    <span key={tech} className="text-xs font-mono px-2 py-1 bg-secondary text-secondary-foreground rounded border border-border">
                      {tech}
                    </span>
                  ))}
                </div>
                
                <div className="flex items-center gap-4 mt-auto pt-4 border-t border-border/50">
                  <a 
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors"
                  >
                    <Github className="w-4 h-4" />
                    Source
                  </a>
                  <a 
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 text-sm font-medium hover:text-primary transition-colors ml-auto"
                  >
                    Preview
                    <ExternalLink className="w-4 h-4" />
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

import { motion } from "framer-motion";
import type { IconType } from "react-icons";
import {
  Server,
  Layers,
  Layout,
  Database,
  Wrench,
  type LucideIcon,
} from "lucide-react";
import {
  SiPhp,
  SiPython,
  SiLaravel,
  SiDjango,
  SiLivewire,
  SiHtml5,
  SiCss,
  SiJavascript,
  SiSass,
  SiTailwindcss,
  SiBootstrap,
  SiMysql,
  SiGit,
  SiGithub,
  SiComposer,
  SiNpm,
} from "react-icons/si";

type Skill = {
  name: string;
  icon: IconType;
};

type SkillGroup = {
  title: string;
  icon: LucideIcon;
  skills: Skill[];
};

export function Skills() {
  const skillGroups: SkillGroup[] = [
    {
      title: "Backend",
      icon: Server,
      skills: [
        { name: "PHP", icon: SiPhp },
        { name: "Python", icon: SiPython },
      ],
    },
    {
      title: "Frameworks",
      icon: Layers,
      skills: [
        { name: "Laravel", icon: SiLaravel },
        { name: "Django", icon: SiDjango },
        { name: "Livewire", icon: SiLivewire },
      ],
    },
    {
      title: "Frontend",
      icon: Layout,
      skills: [
        { name: "HTML", icon: SiHtml5 },
        { name: "CSS3", icon: SiCss },
        { name: "JavaScript (ES6+)", icon: SiJavascript },
        { name: "Tailwind CSS", icon: SiTailwindcss },
        { name: "Bootstrap", icon: SiBootstrap },
      ],
    },
    {
      title: "Database",
      icon: Database,
      skills: [{ name: "MySQL", icon: SiMysql }],
    },
    {
      title: "Tools",
      icon: Wrench,
      skills: [
        { name: "Git", icon: SiGit },
        { name: "GitHub", icon: SiGithub },
        { name: "Composer", icon: SiComposer },
        { name: "NPM", icon: SiNpm },
      ],
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section id="skills" className="py-24 md:py-20 relative">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-display font-bold tracking-tight">Tech Stack</h2>
          <div className="w-12 h-1 bg-primary mt-6"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
          {skillGroups.map((group) => (
            <motion.div
              key={group.title}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-100px" }}
              variants={containerVariants}
              className="flex flex-col"
            >
              <motion.h3
                variants={itemVariants}
                className="text-lg font-mono text-muted-foreground uppercase tracking-widest mb-6 pb-4 border-b border-border/50 flex items-center gap-2"
              >
                <group.icon className="w-4 h-4 text-primary shrink-0" aria-hidden />
                {group.title}
              </motion.h3>

              <div className="flex flex-col gap-3">
                {group.skills.map((skill) => (
                  <motion.div
                    key={skill.name}
                    variants={itemVariants}
                    className="bg-card border border-border p-4 rounded-md flex items-center justify-between hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 group cursor-default"
                  >
                    <div className="flex items-center gap-3">
                      <skill.icon
                        className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors duration-300 shrink-0"
                        aria-hidden
                      />
                      <span className="font-medium">{skill.name}</span>
                    </div>
                    <div className="w-1.5 h-1.5 rounded-full bg-border group-hover:bg-primary transition-colors duration-300" />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

import { Link } from "react-router-dom";
import { Brain, Github, Twitter, Linkedin, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t bg-primary text-primary-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid gap-8 md:grid-cols-4">
          {/* Brand */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-2">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent">
                <Brain className="h-6 w-6 text-accent-foreground" />
              </div>
              <span className="font-display text-xl font-bold">SkillForge</span>
            </Link>
            <p className="text-sm text-primary-foreground/70">
              AI-powered skill intelligence platform helping students bridge the gap between academia and industry.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><Link to="/dashboard" className="hover:text-primary-foreground transition-colors">Dashboard</Link></li>
              <li><Link to="/upload" className="hover:text-primary-foreground transition-colors">Upload CV</Link></li>
              <li><Link to="/first-year" className="hover:text-primary-foreground transition-colors">First Year Onboarding</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="font-display font-semibold mb-4">Resources</h4>
            <ul className="space-y-2 text-sm text-primary-foreground/70">
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Skill Taxonomy</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Career Guides</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Industry Trends</a></li>
              <li><a href="#" className="hover:text-primary-foreground transition-colors">Alumni Network</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-semibold mb-4">Connect</h4>
            <div className="flex gap-4">
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Github className="h-5 w-5" />
              </a>
              <a href="#" className="text-primary-foreground/70 hover:text-accent transition-colors">
                <Mail className="h-5 w-5" />
              </a>
            </div>
            <p className="mt-4 text-sm text-primary-foreground/70">
              contact@skillforge.edu
            </p>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-primary-foreground/10 text-center text-sm text-primary-foreground/50">
          <p>© 2024 SkillForge. Empowering the next generation of professionals.</p>
        </div>
      </div>
    </footer>
  );
}

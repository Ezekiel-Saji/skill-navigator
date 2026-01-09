import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PageLayout } from "@/components/layout";
import { 
  Brain, 
  Upload, 
  Target, 
  TrendingUp, 
  Sparkles, 
  GraduationCap,
  BarChart3,
  Users,
  ArrowRight,
  CheckCircle2,
  Lightbulb,
  Zap
} from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: Brain,
      title: "AI-Powered Skill Extraction",
      description: "Our NLP engine analyzes your CV, projects, and certifications to identify and validate your skills.",
    },
    {
      icon: Target,
      title: "Career Gap Analysis",
      description: "Compare your skills against industry requirements and identify exactly what you need to learn.",
    },
    {
      icon: BarChart3,
      title: "Career Readiness Index",
      description: "Get a comprehensive score that measures your preparedness for your target career path.",
    },
    {
      icon: Sparkles,
      title: "Personalized Roadmaps",
      description: "Receive tailored learning paths with curated resources from MOOCs, certifications, and mentors.",
    },
    {
      icon: Lightbulb,
      title: "Explainable AI",
      description: "Understand why we make each recommendation with transparent, data-driven insights.",
    },
    {
      icon: TrendingUp,
      title: "Outcome Predictions",
      description: "See your projected career readiness and skill growth before and after completing your roadmap.",
    },
  ];

  const stats = [
    { value: "50K+", label: "Students Analyzed" },
    { value: "200+", label: "Career Paths" },
    { value: "85%", label: "Placement Rate" },
    { value: "4.8/5", label: "Student Rating" },
  ];

  return (
    <PageLayout>
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden">
        {/* Background gradient */}
        <div className="absolute inset-0 bg-gradient-hero" />
        
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-20 left-10 w-72 h-72 bg-accent/20 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/10 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="glass" className="mb-6 px-4 py-2 text-sm">
              <Zap className="h-4 w-4 mr-2" />
              AI-Powered Campus Intelligence
            </Badge>
            
            <h1 className="font-display text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
              Transform Your
              <span className="block text-accent">Career Readiness</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-white/80 mb-10 max-w-2xl mx-auto leading-relaxed">
              Bridge the gap between your skills and industry demands with AI-driven insights, 
              personalized roadmaps, and explainable recommendations.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/upload">
                <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                  <Upload className="h-5 w-5" />
                  Upload Your CV
                </Button>
              </Link>
              <Link to="/first-year">
                <Button variant="hero-outline" size="xl" className="gap-2 w-full sm:w-auto">
                  <GraduationCap className="h-5 w-5" />
                  First Year? Start Here
                </Button>
              </Link>
            </div>

            {/* Stats */}
            <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index} 
                  className="p-4 rounded-xl bg-white/10 backdrop-blur-sm border border-white/10"
                >
                  <div className="text-3xl font-display font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/70">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <div className="w-1.5 h-3 bg-white/50 rounded-full" />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="accent" className="mb-4">How It Works</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Your Journey to Industry Readiness
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              From skill assessment to career success in four simple steps
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            {[
              { step: 1, title: "Upload or Onboard", description: "Submit your CV or complete the first-year onboarding questionnaire", icon: Upload },
              { step: 2, title: "AI Analysis", description: "Our NLP engine extracts and validates your skills automatically", icon: Brain },
              { step: 3, title: "Gap Identification", description: "Compare your skills against your target career requirements", icon: Target },
              { step: 4, title: "Personalized Roadmap", description: "Get a tailored learning path with resources and mentors", icon: Sparkles },
            ].map((item, index) => (
              <div key={index} className="relative">
                {index < 3 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-accent to-transparent -translate-x-1/2 z-0" />
                )}
                <Card variant="interactive" className="relative z-10 text-center p-6">
                  <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 text-accent mb-4">
                    <item.icon className="h-8 w-8" />
                  </div>
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-accent text-accent-foreground font-bold flex items-center justify-center text-sm">
                    {item.step}
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-24 bg-secondary/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <Badge variant="accent" className="mb-4">Platform Features</Badge>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-foreground mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive tools powered by AI to accelerate your career development
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <Card 
                key={index} 
                variant="interactive" 
                className="p-6 group"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-accent/10 text-accent flex items-center justify-center group-hover:bg-accent group-hover:text-accent-foreground transition-colors">
                    <feature.icon className="h-6 w-6" />
                  </div>
                  <div>
                    <h3 className="font-display font-semibold text-lg mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-primary text-primary-foreground">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-accent mb-8">
              <Users className="h-10 w-10 text-accent-foreground" />
            </div>
            <h2 className="font-display text-4xl md:text-5xl font-bold mb-6">
              Ready to Discover Your Potential?
            </h2>
            <p className="text-xl text-primary-foreground/80 mb-10">
              Join thousands of students who have transformed their career trajectories 
              with AI-powered skill intelligence.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/upload">
                <Button variant="hero" size="xl" className="gap-2 w-full sm:w-auto">
                  Get Started Now
                  <ArrowRight className="h-5 w-5" />
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button variant="glass" size="xl" className="gap-2 w-full sm:w-auto">
                  View Demo Dashboard
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="py-16 bg-background border-t">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {["NPTEL", "Coursera", "SWAYAM", "Google Cloud", "AWS", "Microsoft"].map((partner) => (
              <div key={partner} className="font-display font-semibold text-lg text-muted-foreground">
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>
    </PageLayout>
  );
};

export default Index;

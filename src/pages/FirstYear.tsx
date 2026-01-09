import { useState } from "react";
import { PageLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { 
  GraduationCap, 
  ArrowRight, 
  ArrowLeft,
  CheckCircle2,
  Sparkles,
  Code,
  Palette,
  TrendingUp,
  Brain,
  Users,
  Globe
} from "lucide-react";
import { Link } from "react-router-dom";
import { mockCareerGoals } from "@/lib/mockData";

const FirstYearPage = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    department: "",
    interests: [] as string[],
    careerGoal: "",
  });

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const interests = [
    { id: "programming", label: "Programming & Coding", icon: Code },
    { id: "data", label: "Data Science & Analytics", icon: TrendingUp },
    { id: "ai", label: "AI & Machine Learning", icon: Brain },
    { id: "design", label: "UI/UX Design", icon: Palette },
    { id: "business", label: "Business & Management", icon: Users },
    { id: "web", label: "Web Development", icon: Globe },
  ];

  const departments = [
    "Computer Science",
    "Information Technology",
    "Electronics",
    "Mechanical Engineering",
    "Civil Engineering",
    "Business Administration",
    "Data Science",
    "Artificial Intelligence",
  ];

  const toggleInterest = (id: string) => {
    setFormData((prev) => ({
      ...prev,
      interests: prev.interests.includes(id)
        ? prev.interests.filter((i) => i !== id)
        : [...prev.interests, id],
    }));
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return formData.name.length > 0;
      case 2:
        return formData.department.length > 0;
      case 3:
        return formData.interests.length > 0;
      case 4:
        return formData.careerGoal.length > 0;
      default:
        return false;
    }
  };

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-accent/10 mb-4">
              <GraduationCap className="h-8 w-8 text-accent" />
            </div>
            <h1 className="font-display text-4xl font-bold text-foreground mb-2">
              First Year Onboarding
            </h1>
            <p className="text-muted-foreground">
              Let's build your skill profile from scratch
            </p>
          </div>

          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between text-sm mb-2">
              <span className="text-muted-foreground">Step {step} of {totalSteps}</span>
              <span className="font-medium">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} variant="accent" />
          </div>

          {/* Step Content */}
          <Card variant="elevated">
            <CardContent className="p-8">
              {step === 1 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-2">
                      What's your name?
                    </h2>
                    <p className="text-muted-foreground">
                      This helps us personalize your experience
                    </p>
                  </div>
                  <Input
                    placeholder="Enter your full name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="text-lg h-14"
                  />
                </div>
              )}

              {step === 2 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-2">
                      Select your department
                    </h2>
                    <p className="text-muted-foreground">
                      This helps us tailor career recommendations
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {departments.map((dept) => (
                      <button
                        key={dept}
                        onClick={() => setFormData({ ...formData, department: dept })}
                        className={`
                          p-4 rounded-xl border-2 text-left transition-all
                          ${formData.department === dept 
                            ? "border-accent bg-accent/5 text-accent" 
                            : "border-border hover:border-accent/50"
                          }
                        `}
                      >
                        <span className="font-medium">{dept}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 3 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-2">
                      What interests you?
                    </h2>
                    <p className="text-muted-foreground">
                      Select all areas you'd like to explore
                    </p>
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    {interests.map((interest) => {
                      const Icon = interest.icon;
                      const isSelected = formData.interests.includes(interest.id);
                      return (
                        <button
                          key={interest.id}
                          onClick={() => toggleInterest(interest.id)}
                          className={`
                            p-5 rounded-xl border-2 text-left transition-all flex items-start gap-3
                            ${isSelected 
                              ? "border-accent bg-accent/5" 
                              : "border-border hover:border-accent/50"
                            }
                          `}
                        >
                          <div className={`
                            w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0
                            ${isSelected ? "bg-accent text-accent-foreground" : "bg-secondary text-muted-foreground"}
                          `}>
                            <Icon className="h-5 w-5" />
                          </div>
                          <div>
                            <span className="font-medium block">{interest.label}</span>
                            {isSelected && (
                              <CheckCircle2 className="h-4 w-4 text-accent mt-1" />
                            )}
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}

              {step === 4 && (
                <div className="space-y-6">
                  <div>
                    <h2 className="font-display text-2xl font-semibold mb-2">
                      Choose your career goal
                    </h2>
                    <p className="text-muted-foreground">
                      Select the role you aspire to achieve
                    </p>
                  </div>
                  <div className="space-y-3">
                    {mockCareerGoals.slice(0, 4).map((goal) => (
                      <button
                        key={goal.id}
                        onClick={() => setFormData({ ...formData, careerGoal: goal.id })}
                        className={`
                          w-full p-5 rounded-xl border-2 text-left transition-all
                          ${formData.careerGoal === goal.id 
                            ? "border-accent bg-accent/5" 
                            : "border-border hover:border-accent/50"
                          }
                        `}
                      >
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="font-semibold text-lg">{goal.title}</h3>
                          <Badge 
                            variant={goal.demandLevel === "very-high" ? "success" : "info"}
                          >
                            {goal.demandLevel.replace("-", " ")} demand
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {goal.description}
                        </p>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="text-muted-foreground">Avg. Salary:</span>
                          <span className="font-medium text-accent">{goal.averageSalary}</span>
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {step === 5 && (
                <div className="text-center py-8">
                  <div className="w-20 h-20 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-6">
                    <Sparkles className="h-10 w-10 text-success" />
                  </div>
                  <h2 className="font-display text-2xl font-semibold mb-2">
                    Welcome, {formData.name}!
                  </h2>
                  <p className="text-muted-foreground mb-6">
                    Your personalized skill profile has been created. Let's explore your dashboard!
                  </p>
                  <Link to="/dashboard">
                    <Button variant="hero" size="lg" className="gap-2">
                      Go to Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
                </div>
              )}

              {/* Navigation */}
              {step <= 4 && (
                <div className="flex justify-between mt-8 pt-6 border-t">
                  <Button
                    variant="outline"
                    onClick={() => setStep(step - 1)}
                    disabled={step === 1}
                    className="gap-2"
                  >
                    <ArrowLeft className="h-4 w-4" />
                    Back
                  </Button>
                  <Button
                    variant="accent"
                    onClick={() => setStep(step + 1)}
                    disabled={!canProceed()}
                    className="gap-2"
                  >
                    {step === 4 ? "Complete" : "Continue"}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default FirstYearPage;

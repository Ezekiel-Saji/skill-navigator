import { PageLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  CareerReadiness,
  SkillHeatmap,
  RoadmapTimeline,
  ExplainablePanel,
  OutcomePredictor,
  SkillGapAnalysis,
} from "@/components/dashboard";
import ProjectEditor from "@/components/dashboard/ProjectEditor";
import { Project } from "@/lib/types";
import {
  mockStudentProfile,
  mockSkillGaps,
  mockExplanations,
  mockOutcomePrediction,
} from "@/lib/mockData";
import { useEffect, useState } from "react";
import { 
  User, 
  Target, 
  GraduationCap, 
  Briefcase,
  Settings,
  Bell,
  Download
} from "lucide-react";

const Dashboard = () => {
  const profile = mockStudentProfile;
  const [storedGoal, setStoredGoal] = useState<{ title: string; period: string } | null>(null);
  const [projects, setProjects] = useState<Project[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("studentGoal");
      if (raw) {
        const parsed = JSON.parse(raw);
        setStoredGoal({ title: parsed.title || "", period: parsed.period || "" });
      }
    } catch (e) {
      // ignore
    }
    const handler = (e: any) => {
      const d = e?.detail;
      if (d) {
        setStoredGoal({ title: d.title || "", period: d.period || "" });
      } else {
        setStoredGoal(null);
      }
    };
    window.addEventListener("studentGoalChanged", handler as EventListener);
    return () => window.removeEventListener("studentGoalChanged", handler as EventListener);
  }, []);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("studentProjects");
      if (raw) {
        const parsed = JSON.parse(raw) as Project[];
        setProjects(parsed);
      } else {
        setProjects(profile.projects || []);
      }
    } catch (e) {
      setProjects(profile.projects || []);
    }
  }, []);

  const addProject = (p: Project) => {
    setProjects(prev => {
      const next = [p, ...prev];
      try {
        localStorage.setItem("studentProjects", JSON.stringify(next));
      } catch (e) {
        // ignore
      }
      return next;
    });
  };

  return (
    <PageLayout showFooter={false}>
      <div className="min-h-screen bg-background">
        {/* Profile Header */}
        <div className="bg-gradient-hero text-white">
          <div className="container mx-auto px-4 py-8">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/20 flex items-center justify-center">
                  <User className="h-8 w-8" />
                </div>
                <div>
                  <h1 className="font-display text-2xl font-bold">{profile.name}</h1>
                  <div className="flex items-center gap-3 text-white/80 text-sm">
                    <span className="flex items-center gap-1">
                      <GraduationCap className="h-4 w-4" />
                      Year {profile.year}
                    </span>
                    <span>•</span>
                    <span>{profile.department}</span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                {(storedGoal?.title || profile.careerGoal) && (
                  <Badge variant="glass" className="px-4 py-2 max-w-xs truncate">
                    <Target className="h-4 w-4 mr-2" />
                    {storedGoal?.title ?? profile.careerGoal.title}
                    {storedGoal?.period && (
                      <span className="block text-xs text-white/70">{storedGoal.period}</span>
                    )}
                  </Badge>
                )}
                <Button variant="glass" size="icon">
                  <Bell className="h-4 w-4" />
                </Button>
                <Button variant="glass" size="icon">
                  <Settings className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Dashboard Content */}
        <div className="container mx-auto px-4 py-8">
          <Tabs defaultValue="overview" className="space-y-8">
            <TabsList className="bg-card border">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="skills">Skills</TabsTrigger>
              <TabsTrigger value="roadmap">Roadmap</TabsTrigger>
              <TabsTrigger value="insights">AI Insights</TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-8">
              <div className="grid lg:grid-cols-3 gap-4">
                <div className="lg:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Your Goal</CardTitle>
                    </CardHeader>
                    <CardContent>
                      {storedGoal?.title || profile.careerGoal ? (
                        <div>
                          <div className="font-semibold text-foreground">{storedGoal?.title ?? profile.careerGoal.title}</div>
                          {storedGoal?.period && (
                            <div className="text-xs text-muted-foreground mt-1">{storedGoal.period}</div>
                          )}
                        </div>
                      ) : (
                        <div className="text-sm text-muted-foreground">No goal set. Go to the home page to add your ambition.</div>
                      )}
                    </CardContent>
                  </Card>
                </div>
                <div className="lg:col-span-2">
                  {/* placeholder: rest of overview content continues below */}
                </div>
              </div>
              {/* Quick Stats */}
              <div className="grid md:grid-cols-4 gap-4">
                {[
                  { label: "Career Readiness", value: `${profile.cri.overall}%`, trend: "+5% this month" },
                  { label: "Skills Validated", value: profile.skills.filter(s => s.validated).length.toString(), trend: `of ${profile.skills.length} total` },
                  { label: "Projects Completed", value: profile.projects.length.toString(), trend: "2 pending validation" },
                  { label: "Roadmap Progress", value: "35%", trend: "Phase 1 in progress" },
                ].map((stat, index) => (
                  <Card key={index} variant="stat">
                    <CardContent className="pt-6">
                      <div className="text-3xl font-display font-bold text-foreground mb-1">
                        {stat.value}
                      </div>
                      <div className="text-sm font-medium text-foreground mb-1">
                        {stat.label}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {stat.trend}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Main Content Grid */}
              <div className="grid lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1">
                  <CareerReadiness cri={profile.cri} />
                </div>
                <div className="lg:col-span-2">
                  <SkillGapAnalysis gaps={mockSkillGaps} />
                </div>
              </div>

              {/* Outcome Prediction */}
              <OutcomePredictor prediction={mockOutcomePrediction} />
            </TabsContent>

            {/* Skills Tab */}
            <TabsContent value="skills" className="space-y-8">
              <SkillHeatmap skills={profile.skills} />
              
              {/* Projects */}
              <Card variant="elevated">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center gap-2">
                      <Briefcase className="h-5 w-5 text-accent" />
                      Validated Projects
                    </CardTitle>
                    <ProjectEditor onAdd={addProject} />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {projects.map((project) => (
                      <div
                        key={project.id}
                        className="p-4 rounded-xl border bg-gradient-to-br from-background to-secondary/20"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <h4 className="font-semibold">{project.title}</h4>
                          {project.validated && (
                            <Badge variant="success">Validated</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          {project.description}
                        </p>
                        {project.githubRepo && (
                          <div className="mb-2">
                            <a href={project.githubRepo} target="_blank" rel="noreferrer" className="text-sm text-accent underline">
                              View repository
                            </a>
                          </div>
                        )}
                        <div className="flex flex-wrap gap-1.5">
                          {project.skills.map((skill, i) => (
                            <Badge key={i} variant="secondary" className="text-xs">
                              {skill}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            {/* Roadmap Tab */}
            <TabsContent value="roadmap" className="space-y-8">
              <RoadmapTimeline phases={profile.roadmap} />
            </TabsContent>

            {/* Insights Tab */}
            <TabsContent value="insights" className="space-y-8">
              <div className="grid md:grid-cols-2 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Top AI Recommendations</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="list-disc pl-5 text-sm text-muted-foreground">
                      {mockExplanations.slice(0, 3).map((e) => (
                        <li key={e.id}>{e.title}</li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Predicted Outcome</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-display font-bold text-foreground mb-1">
                      {mockOutcomePrediction.predictedState.cri} CRI
                    </div>
                    <div className="text-sm text-muted-foreground mb-2">
                      Expected in {mockOutcomePrediction.predictedState.timeframe}
                    </div>
                    <div className="text-sm">
                      New skills: {mockOutcomePrediction.predictedState.newSkills.join(", ")}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <ExplainablePanel explanations={mockExplanations} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;

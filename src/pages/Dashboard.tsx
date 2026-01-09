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
import {
  mockStudentProfile,
  mockSkillGaps,
  mockExplanations,
  mockOutcomePrediction,
} from "@/lib/mockData";
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
                {profile.careerGoal && (
                  <Badge variant="glass" className="px-4 py-2">
                    <Target className="h-4 w-4 mr-2" />
                    {profile.careerGoal.title}
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
                    <Button variant="outline" size="sm">
                      Add Project
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-4">
                    {profile.projects.map((project) => (
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
              <ExplainablePanel explanations={mockExplanations} />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </PageLayout>
  );
};

export default Dashboard;

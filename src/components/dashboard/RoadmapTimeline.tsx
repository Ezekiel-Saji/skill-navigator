import { RoadmapPhase } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  CheckCircle2, 
  Clock, 
  PlayCircle, 
  BookOpen, 
  Award, 
  Users, 
  Laptop,
  Briefcase
} from "lucide-react";

interface RoadmapTimelineProps {
  phases: RoadmapPhase[];
}

export function RoadmapTimeline({ phases }: RoadmapTimelineProps) {
  const getStatusIcon = (status: RoadmapPhase["status"]) => {
    switch (status) {
      case "completed":
        return <CheckCircle2 className="h-5 w-5 text-success" />;
      case "in-progress":
        return <PlayCircle className="h-5 w-5 text-accent animate-pulse" />;
      case "pending":
        return <Clock className="h-5 w-5 text-muted-foreground" />;
    }
  };

  const getStatusColor = (status: RoadmapPhase["status"]) => {
    switch (status) {
      case "completed":
        return "border-success bg-success/5";
      case "in-progress":
        return "border-accent bg-accent/5";
      case "pending":
        return "border-border bg-card";
    }
  };

  const resourceIcons = {
    mooc: BookOpen,
    certification: Award,
    workshop: Laptop,
    project: Briefcase,
    mentor: Users,
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle>Your Learning Roadmap</CardTitle>
          <Badge variant="accent">
            +{phases.reduce((acc, p) => acc + p.expectedCRIImprovement, 0)} CRI potential
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="relative space-y-0">
          {/* Timeline line */}
          <div className="absolute left-6 top-8 bottom-8 w-0.5 bg-border" />

          {phases.map((phase, index) => (
            <div key={phase.id} className="relative pl-16 pb-8 last:pb-0">
              {/* Timeline dot */}
              <div
                className={`
                  absolute left-4 w-5 h-5 rounded-full border-2 bg-background
                  ${phase.status === "completed" ? "border-success" : ""}
                  ${phase.status === "in-progress" ? "border-accent" : ""}
                  ${phase.status === "pending" ? "border-muted-foreground" : ""}
                `}
              >
                <div
                  className={`
                    absolute inset-1 rounded-full
                    ${phase.status === "completed" ? "bg-success" : ""}
                    ${phase.status === "in-progress" ? "bg-accent animate-pulse" : ""}
                  `}
                />
              </div>

              {/* Phase Card */}
              <div
                className={`
                  rounded-xl border-2 p-5 transition-all duration-300
                  ${getStatusColor(phase.status)}
                  ${phase.status === "in-progress" ? "shadow-md" : ""}
                `}
              >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-muted-foreground">
                        Phase {phase.phase}
                      </span>
                      {getStatusIcon(phase.status)}
                    </div>
                    <h4 className="font-display font-semibold text-lg">
                      {phase.title}
                    </h4>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-medium text-accent">
                      +{phase.expectedCRIImprovement} CRI
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {phase.duration}
                    </div>
                  </div>
                </div>

                {/* Skills */}
                <div className="mb-4">
                  <div className="flex flex-wrap gap-1.5">
                    {phase.skills.map((skill, i) => (
                      <Badge key={i} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Objectives */}
                <div className="mb-4">
                  <h5 className="text-xs font-medium text-muted-foreground mb-2">
                    Objectives
                  </h5>
                  <ul className="space-y-1">
                    {phase.objectives.map((obj, i) => (
                      <li key={i} className="text-sm flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        {obj}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Resources */}
                <div>
                  <h5 className="text-xs font-medium text-muted-foreground mb-2">
                    Recommended Resources
                  </h5>
                  <div className="grid gap-2">
                    {phase.resources.slice(0, 3).map((resource) => {
                      const Icon = resourceIcons[resource.type];
                      return (
                        <div
                          key={resource.id}
                          className="flex items-center gap-3 p-2 rounded-lg bg-background border hover:border-accent transition-colors cursor-pointer"
                        >
                          <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-accent/10 flex items-center justify-center">
                            <Icon className="h-4 w-4 text-accent" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {resource.title}
                            </div>
                            <div className="text-xs text-muted-foreground">
                              {resource.provider} • {resource.duration}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

                {/* Progress for in-progress phase */}
                {phase.status === "in-progress" && (
                  <div className="mt-4 pt-4 border-t">
                    <div className="flex items-center justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Phase Progress</span>
                      <span className="font-medium">35%</span>
                    </div>
                    <Progress value={35} variant="accent" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

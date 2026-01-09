import { Skill } from "@/lib/types";
import { skillCategories } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { TrendingUp, CheckCircle2 } from "lucide-react";

interface SkillHeatmapProps {
  skills: Skill[];
}

export function SkillHeatmap({ skills }: SkillHeatmapProps) {
  // Group skills by category
  const groupedSkills = skills.reduce((acc, skill) => {
    if (!acc[skill.category]) {
      acc[skill.category] = [];
    }
    acc[skill.category].push(skill);
    return acc;
  }, {} as Record<string, Skill[]>);

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 80) return "bg-accent";
    if (confidence >= 60) return "bg-success";
    if (confidence >= 40) return "bg-info";
    if (confidence >= 20) return "bg-warning";
    return "bg-destructive";
  };

  const getLevelBadge = (level: Skill["level"]) => {
    const variants = {
      beginner: "beginner",
      intermediate: "intermediate",
      advanced: "advanced",
      expert: "expert",
    } as const;
    return variants[level];
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <CardTitle>Skill Proficiency Heatmap</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {Object.entries(groupedSkills).map(([category, categorySkills]) => {
            const categoryData = skillCategories.find((c) => c.name === category);
            return (
              <div key={category} className="space-y-3">
                <div className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: categoryData?.color }}
                  />
                  <h4 className="font-medium text-sm text-foreground">{category}</h4>
                  <span className="text-xs text-muted-foreground">
                    ({categorySkills.length} skills)
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {categorySkills.map((skill) => (
                    <Tooltip key={skill.id}>
                      <TooltipTrigger asChild>
                        <div
                          className={`
                            relative px-3 py-2 rounded-lg border cursor-pointer
                            transition-all duration-200 hover:scale-105 hover:shadow-md
                            ${getConfidenceColor(skill.confidence)}
                          `}
                        >
                          <div className="flex items-center gap-1.5">
                            <span className="text-sm font-medium text-white">
                              {skill.name}
                            </span>
                            {skill.validated && (
                              <CheckCircle2 className="h-3 w-3 text-white/80" />
                            )}
                            {skill.trending && (
                              <TrendingUp className="h-3 w-3 text-white/80" />
                            )}
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent side="top" className="max-w-xs">
                        <div className="space-y-2">
                          <div className="flex items-center justify-between gap-4">
                            <span className="font-semibold">{skill.name}</span>
                            <Badge variant={getLevelBadge(skill.level)}>
                              {skill.level}
                            </Badge>
                          </div>
                          <div className="grid grid-cols-2 gap-2 text-xs">
                            <div>
                              <span className="text-muted-foreground">Confidence:</span>
                              <span className="ml-1 font-medium">{skill.confidence}%</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Industry:</span>
                              <span className="ml-1 font-medium">{skill.industryRelevance}%</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Source:</span>
                              <span className="ml-1 font-medium capitalize">{skill.source}</span>
                            </div>
                            <div>
                              <span className="text-muted-foreground">Validated:</span>
                              <span className="ml-1 font-medium">{skill.validated ? "Yes" : "No"}</span>
                            </div>
                          </div>
                          {skill.trending && (
                            <div className="flex items-center gap-1 text-xs text-accent">
                              <TrendingUp className="h-3 w-3" />
                              <span>Trending skill in industry</span>
                            </div>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend */}
        <div className="mt-6 pt-4 border-t">
          <div className="flex flex-wrap items-center gap-4 text-xs">
            <span className="text-muted-foreground">Confidence Level:</span>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-destructive" />
              <span>0-20%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-warning" />
              <span>20-40%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-info" />
              <span>40-60%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-success" />
              <span>60-80%</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 rounded bg-accent" />
              <span>80-100%</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

import { SkillGap } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { AlertTriangle, TrendingUp } from "lucide-react";

interface SkillGapAnalysisProps {
  gaps: SkillGap[];
}

export function SkillGapAnalysis({ gaps }: SkillGapAnalysisProps) {
  const priorityColors = {
    critical: "destructive",
    high: "warning",
    medium: "info",
    low: "secondary",
  } as const;

  const sortedGaps = [...gaps].sort((a, b) => {
    const priorityOrder = { critical: 0, high: 1, medium: 2, low: 3 };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-warning" />
            <CardTitle>Skill Gap Analysis</CardTitle>
          </div>
          <Badge variant="outline">{gaps.length} gaps identified</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedGaps.map((gap, index) => (
          <div
            key={index}
            className="p-4 rounded-xl border bg-gradient-to-r from-background to-secondary/10 hover:shadow-md transition-all"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-foreground">{gap.skill}</h4>
                  <Badge variant={priorityColors[gap.priority]} className="text-xs">
                    {gap.priority}
                  </Badge>
                </div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <TrendingUp className="h-3 w-3" />
                  <span>{gap.industryImportance}% industry importance</span>
                </div>
              </div>
              <div className="text-right">
                <div className="text-2xl font-display font-bold text-destructive">
                  -{gap.gap}%
                </div>
                <div className="text-xs text-muted-foreground">gap</div>
              </div>
            </div>

            {/* Progress visualization */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-muted-foreground">Current: {gap.currentLevel}%</span>
                <span className="text-accent">Required: {gap.requiredLevel}%</span>
              </div>
              <div className="relative">
                <Progress value={gap.requiredLevel} size="lg" variant="default" className="opacity-30" />
                <div className="absolute inset-0">
                  <Progress value={gap.currentLevel} size="lg" variant="accent" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

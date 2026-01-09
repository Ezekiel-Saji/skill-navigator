import { CRIScore } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Minus, Target, Zap, BarChart3, BookOpen } from "lucide-react";

interface CareerReadinessProps {
  cri: CRIScore;
}

export function CareerReadiness({ cri }: CareerReadinessProps) {
  const trendIcon = {
    up: <TrendingUp className="h-4 w-4 text-success" />,
    down: <TrendingDown className="h-4 w-4 text-destructive" />,
    stable: <Minus className="h-4 w-4 text-muted-foreground" />,
  };

  const labelColors = {
    Beginner: "warning",
    Emerging: "info",
    "Industry-Ready": "success",
  } as const;

  const metrics = [
    { label: "Skill Match", value: cri.skillMatch, icon: Target, color: "text-chart-1" },
    { label: "Project Score", value: cri.projectScore, icon: Zap, color: "text-chart-2" },
    { label: "Industry Relevance", value: cri.industryRelevance, icon: BarChart3, color: "text-chart-3" },
    { label: "Learning Progress", value: cri.learningProgress, icon: BookOpen, color: "text-chart-4" },
  ];

  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            Career Readiness Index
            {trendIcon[cri.trend]}
          </CardTitle>
          <Badge variant={labelColors[cri.label]}>{cri.label}</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Main CRI Score */}
        <div className="text-center py-6">
          <div className="relative inline-flex items-center justify-center">
            <svg className="w-40 h-40 transform -rotate-90">
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="currentColor"
                strokeWidth="12"
                fill="none"
                className="text-secondary"
              />
              <circle
                cx="80"
                cy="80"
                r="70"
                stroke="url(#cri-gradient)"
                strokeWidth="12"
                fill="none"
                strokeLinecap="round"
                strokeDasharray={`${(cri.overall / 100) * 440} 440`}
                className="transition-all duration-1000 ease-out"
              />
              <defs>
                <linearGradient id="cri-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="hsl(var(--accent))" />
                  <stop offset="100%" stopColor="hsl(var(--success))" />
                </linearGradient>
              </defs>
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-5xl font-display font-bold text-foreground">{cri.overall}</span>
              <span className="text-sm text-muted-foreground">out of 100</span>
            </div>
          </div>
          
          {/* Predicted Score */}
          <div className="mt-4 flex items-center justify-center gap-2 text-sm">
            <span className="text-muted-foreground">Predicted:</span>
            <span className="font-semibold text-accent">{cri.predictedScore}</span>
            <span className="text-success text-xs">+{cri.predictedScore - cri.overall} pts</span>
          </div>
        </div>

        {/* Breakdown Metrics */}
        <div className="space-y-4">
          {metrics.map((metric) => {
            const Icon = metric.icon;
            return (
              <div key={metric.label} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Icon className={`h-4 w-4 ${metric.color}`} />
                    <span className="text-muted-foreground">{metric.label}</span>
                  </div>
                  <span className="font-medium">{metric.value}%</span>
                </div>
                <Progress value={metric.value} size="sm" variant="accent" />
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
}

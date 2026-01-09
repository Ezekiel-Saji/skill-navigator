import { Explanation } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Lightbulb, 
  TrendingUp, 
  TrendingDown, 
  Minus,
  ChevronRight,
  Info
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ExplainablePanelProps {
  explanations: Explanation[];
}

export function ExplainablePanel({ explanations }: ExplainablePanelProps) {
  const typeIcons = {
    skill: "🎯",
    gap: "⚠️",
    recommendation: "💡",
    prediction: "🔮",
  };

  const typeColors = {
    skill: "accent",
    gap: "warning",
    recommendation: "success",
    prediction: "info",
  } as const;

  const impactIcon = {
    positive: <TrendingUp className="h-3 w-3 text-success" />,
    negative: <TrendingDown className="h-3 w-3 text-destructive" />,
    neutral: <Minus className="h-3 w-3 text-muted-foreground" />,
  };

  return (
    <Card variant="elevated">
      <CardHeader>
        <div className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5 text-accent" />
          <CardTitle>AI Insights & Explanations</CardTitle>
        </div>
        <p className="text-sm text-muted-foreground">
          Understand why we made these recommendations
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        {explanations.map((explanation) => (
          <div
            key={explanation.id}
            className="p-4 rounded-xl border bg-gradient-to-br from-background to-secondary/20 hover:shadow-md transition-all"
          >
            {/* Header */}
            <div className="flex items-start gap-3 mb-3">
              <span className="text-2xl">{typeIcons[explanation.type]}</span>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <Badge variant={typeColors[explanation.type]} className="text-xs">
                    {explanation.type}
                  </Badge>
                </div>
                <h4 className="font-semibold text-foreground">{explanation.title}</h4>
              </div>
            </div>

            {/* Content */}
            <p className="text-sm text-muted-foreground mb-4 pl-10">
              {explanation.content}
            </p>

            {/* Factors */}
            <div className="pl-10 space-y-3">
              <h5 className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                <Info className="h-3 w-3" />
                Contributing Factors
              </h5>
              {explanation.factors.map((factor, index) => (
                <div key={index} className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-2">
                      {impactIcon[factor.impact]}
                      <span className="text-foreground">{factor.label}</span>
                    </div>
                    <span className="text-muted-foreground text-xs">
                      {(factor.weight * 100).toFixed(0)}% weight
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Progress 
                      value={factor.weight * 100} 
                      size="sm" 
                      variant={factor.impact === "positive" ? "success" : factor.impact === "negative" ? "default" : "default"}
                      className="flex-1"
                    />
                    <span className="text-xs text-muted-foreground min-w-[100px] text-right">
                      {factor.value}
                    </span>
                  </div>
                </div>
              ))}
            </div>

            {/* Action */}
            <div className="mt-4 pt-3 border-t pl-10">
              <button className="text-sm text-accent font-medium flex items-center gap-1 hover:gap-2 transition-all">
                Learn more
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

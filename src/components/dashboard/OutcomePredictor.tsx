import { OutcomePrediction } from "@/lib/types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, TrendingUp, Clock, Target, Sparkles } from "lucide-react";

interface OutcomePredictorProps {
  prediction: OutcomePrediction;
}

export function OutcomePredictor({ prediction }: OutcomePredictorProps) {
  return (
    <Card variant="elevated" className="overflow-hidden">
      <CardHeader className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
        <div className="flex items-center gap-2">
          <Sparkles className="h-5 w-5" />
          <CardTitle className="text-primary-foreground">Outcome Prediction</CardTitle>
        </div>
        <p className="text-sm text-primary-foreground/80">
          Your projected career readiness after completing the roadmap
        </p>
      </CardHeader>
      <CardContent className="p-0">
        {/* Before vs After Comparison */}
        <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x">
          {/* Current State */}
          <div className="p-6 bg-muted/30">
            <div className="flex items-center gap-2 mb-4">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <h4 className="font-medium text-muted-foreground">Current State</h4>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-display font-bold text-foreground">
                {prediction.currentState.cri}
              </div>
              <div className="text-sm text-muted-foreground">Career Readiness Index</div>
              <Badge variant="warning" className="mt-2">
                {prediction.currentState.readiness}
              </Badge>
            </div>

            <div>
              <h5 className="text-xs font-medium text-muted-foreground mb-2">Top Skills</h5>
              <div className="flex flex-wrap gap-1.5">
                {prediction.currentState.topSkills.map((skill, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>

          {/* Predicted State */}
          <div className="p-6 bg-accent/5 relative">
            {/* Arrow indicator */}
            <div className="hidden md:flex absolute -left-4 top-1/2 -translate-y-1/2 w-8 h-8 rounded-full bg-accent items-center justify-center shadow-md">
              <ArrowRight className="h-4 w-4 text-accent-foreground" />
            </div>

            <div className="flex items-center gap-2 mb-4">
              <Target className="h-4 w-4 text-accent" />
              <h4 className="font-medium text-accent">
                After {prediction.predictedState.timeframe}
              </h4>
            </div>
            
            <div className="text-center mb-6">
              <div className="text-5xl font-display font-bold text-accent">
                {prediction.predictedState.cri}
              </div>
              <div className="text-sm text-muted-foreground">Predicted CRI</div>
              <Badge variant="success" className="mt-2">
                {prediction.predictedState.readiness}
              </Badge>
            </div>

            <div>
              <h5 className="text-xs font-medium text-muted-foreground mb-2">New Skills</h5>
              <div className="flex flex-wrap gap-1.5">
                {prediction.predictedState.newSkills.map((skill, i) => (
                  <Badge key={i} variant="accent" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Improvement Metrics */}
        <div className="p-6 border-t bg-background">
          <h4 className="font-medium mb-4 flex items-center gap-2">
            <TrendingUp className="h-4 w-4 text-success" />
            Projected Improvements
          </h4>
          <div className="grid sm:grid-cols-2 gap-4">
            {prediction.improvements.map((improvement, index) => (
              <div
                key={index}
                className="p-4 rounded-lg border bg-gradient-to-br from-background to-secondary/20"
              >
                <div className="text-sm text-muted-foreground mb-2">
                  {improvement.metric}
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-2xl font-display font-bold text-foreground">
                    {improvement.current}
                  </span>
                  <ArrowRight className="h-4 w-4 text-muted-foreground" />
                  <span className="text-2xl font-display font-bold text-accent">
                    {improvement.predicted}
                  </span>
                  <span className="text-sm font-medium text-success ml-auto">
                    +{improvement.change}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

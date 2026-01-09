import { useState } from "react";
import { PageLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Brain, 
  Loader2,
  AlertCircle,
  ArrowRight,
  Plus,
  X
} from "lucide-react";
import { Link } from "react-router-dom";
import { mockSkills, mockSkillGaps, mockCRI } from "@/lib/mockData";

type UploadState = "idle" | "uploading" | "processing" | "complete" | "error";

const UploadPage = () => {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [manualSkills, setManualSkills] = useState("");
  const [parsedSkills, setParsedSkills] = useState<string[]>([]);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleFile = (file: File) => {
    if (file.type !== "application/pdf") {
      setUploadState("error");
      return;
    }
    
    setFileName(file.name);
    simulateUpload();
  };

  const handleSkillsInput = (value: string) => {
    setManualSkills(value);
    // Parse comma-separated skills
    const skills = value
      .split(/[,\n]/)
      .map(s => s.trim())
      .filter(s => s.length > 0);
    setParsedSkills(skills);
  };

  const removeSkill = (skillToRemove: string) => {
    const updatedSkills = parsedSkills.filter(s => s !== skillToRemove);
    setParsedSkills(updatedSkills);
    setManualSkills(updatedSkills.join(", "));
  };

  const simulateUpload = () => {
    setUploadState("uploading");
    setUploadProgress(0);

    const uploadInterval = setInterval(() => {
      setUploadProgress((prev) => {
        if (prev >= 100) {
          clearInterval(uploadInterval);
          setUploadState("processing");
          simulateProcessing();
          return 100;
        }
        return prev + 10;
      });
    }, 200);
  };

  const simulateProcessing = () => {
    setTimeout(() => {
      setUploadState("complete");
    }, 3000);
  };

  const handleAnalyzeSkills = () => {
    if (parsedSkills.length === 0) return;
    simulateUpload();
  };

  // Combine CV extracted skills with manual skills
  const extractedSkills = mockSkills.slice(0, 6);
  const allSkills = [...extractedSkills.map(s => s.name), ...parsedSkills];
  const uniqueSkills = [...new Set(allSkills)];

  // Get analysis data
  const topGaps = mockSkillGaps.slice(0, 3);
  const cri = mockCRI;

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          {/* Header */}
          <div className="text-center mb-10">
            <Badge variant="accent" className="mb-4">Step 1 of 3</Badge>
            <h1 className="font-display text-4xl font-bold text-foreground mb-4">
              Upload Your CV
            </h1>
            <p className="text-lg text-muted-foreground">
              Our AI will analyze your resume to extract skills, experience, and projects
            </p>
          </div>

          {/* Upload Card */}
          <Card variant="elevated" className="mb-6">
            <CardContent className="p-8">
              {uploadState === "idle" && (
                <div
                  className={`
                    border-2 border-dashed rounded-xl p-12 text-center transition-all
                    ${dragActive ? "border-accent bg-accent/5" : "border-border hover:border-accent/50"}
                  `}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  <div className="flex flex-col items-center">
                    <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mb-4">
                      <Upload className="h-8 w-8 text-accent" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">
                      Drag and drop your CV here
                    </h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      or click to browse files
                    </p>
                    <Button variant="accent" asChild>
                      <label className="cursor-pointer">
                        <input
                          type="file"
                          accept=".pdf"
                          className="hidden"
                          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
                        />
                        Select PDF File
                      </label>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-4">
                      Supported format: PDF (Max 10MB)
                    </p>
                  </div>
                </div>
              )}

              {uploadState === "uploading" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4">
                    <FileText className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    {fileName ? `Uploading ${fileName}` : "Analyzing your skills..."}
                  </h3>
                  <div className="max-w-xs mx-auto mb-4">
                    <Progress value={uploadProgress} variant="accent" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {uploadProgress}% complete
                  </p>
                </div>
              )}

              {uploadState === "processing" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-accent/10 flex items-center justify-center mx-auto mb-4 animate-pulse">
                    <Brain className="h-8 w-8 text-accent" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    AI is Analyzing Your Skills
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Computing skill gaps and career readiness...
                  </div>
                </div>
              )}

              {uploadState === "complete" && (
                <div className="py-8">
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                      <CheckCircle2 className="h-8 w-8 text-success" />
                    </div>
                    <h3 className="font-display font-semibold text-lg mb-2">
                      Analysis Complete!
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      We analyzed {uniqueSkills.length} skills from your profile
                    </p>
                  </div>
                  
                  {/* Skills Identified */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">Skills Identified</h4>
                    <div className="flex flex-wrap gap-2">
                      {uniqueSkills.slice(0, 10).map((skill, idx) => (
                        <Badge key={idx} variant="accent">
                          {skill}
                        </Badge>
                      ))}
                      {uniqueSkills.length > 10 && (
                        <Badge variant="secondary">+{uniqueSkills.length - 10} more</Badge>
                      )}
                    </div>
                  </div>

                  {/* CRI Score */}
                  <div className="bg-muted/50 rounded-xl p-4 mb-6">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="text-sm font-medium text-foreground">Career Readiness Index</h4>
                      <Badge variant={cri.overall >= 70 ? "success" : cri.overall >= 50 ? "warning" : "destructive"}>
                        {cri.label}
                      </Badge>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="text-3xl font-bold text-accent">{cri.overall}</div>
                      <div className="flex-1">
                        <Progress value={cri.overall} variant="cri" />
                      </div>
                    </div>
                    <p className="text-xs text-muted-foreground mt-2">
                      Predicted score after completing roadmap: {cri.predictedScore}
                    </p>
                  </div>

                  {/* Top Skill Gaps */}
                  <div className="mb-6">
                    <h4 className="text-sm font-medium text-foreground mb-3">Top Skill Gaps to Address</h4>
                    <div className="space-y-3">
                      {topGaps.map((gap, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-muted/30 rounded-lg p-3">
                          <div className="flex items-center gap-3">
                            <Badge variant={gap.priority === 'critical' ? 'destructive' : gap.priority === 'high' ? 'warning' : 'secondary'} className="text-xs">
                              {gap.priority}
                            </Badge>
                            <span className="font-medium text-sm">{gap.skill}</span>
                          </div>
                          <div className="text-right">
                            <div className="text-xs text-muted-foreground">
                              Current: {gap.currentLevel}% → Required: {gap.requiredLevel}%
                            </div>
                            <div className="w-24 mt-1">
                              <Progress value={gap.currentLevel} variant="default" className="h-1.5" />
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="text-center">
                    <Link to="/dashboard">
                      <Button variant="hero" size="lg" className="gap-2">
                        View Full Dashboard
                        <ArrowRight className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </div>
              )}

              {uploadState === "error" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-destructive/10 flex items-center justify-center mx-auto mb-4">
                    <AlertCircle className="h-8 w-8 text-destructive" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Upload Failed
                  </h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Please upload a valid PDF file
                  </p>
                  <Button variant="outline" onClick={() => setUploadState("idle")}>
                    Try Again
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Manual Skills Input */}
          {uploadState === "idle" && (
            <Card variant="elevated" className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Plus className="h-5 w-5 text-accent" />
                  Add Skills Manually
                </CardTitle>
                <CardDescription>
                  Enter your skills separated by commas (e.g., Python, JavaScript, Web Development)
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="skills">Your Skills</Label>
                    <Textarea
                      id="skills"
                      placeholder="Python, JavaScript, React, Machine Learning, Data Analysis, SQL, Web Development..."
                      value={manualSkills}
                      onChange={(e) => handleSkillsInput(e.target.value)}
                      className="mt-2 min-h-[100px]"
                    />
                  </div>
                  
                  {parsedSkills.length > 0 && (
                    <div>
                      <Label className="text-sm text-muted-foreground mb-2 block">
                        Parsed Skills ({parsedSkills.length})
                      </Label>
                      <div className="flex flex-wrap gap-2">
                        {parsedSkills.map((skill, idx) => (
                          <Badge key={idx} variant="skill" className="gap-1 pr-1">
                            {skill}
                            <button
                              onClick={() => removeSkill(skill)}
                              className="ml-1 hover:bg-accent/20 rounded-full p-0.5"
                            >
                              <X className="h-3 w-3" />
                            </button>
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}

                  <Button 
                    variant="accent" 
                    className="w-full gap-2"
                    disabled={parsedSkills.length === 0}
                    onClick={handleAnalyzeSkills}
                  >
                    <Brain className="h-4 w-4" />
                    Analyze Skills & Get Career Insights
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Alternative Option */}
          <Card variant="default" className="text-center">
            <CardContent className="py-6">
              <p className="text-sm text-muted-foreground mb-3">
                Don't have a CV yet? No problem!
              </p>
              <Link to="/first-year">
                <Button variant="outline" className="gap-2">
                  Complete First-Year Onboarding
                  <ArrowRight className="h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageLayout>
  );
};

export default UploadPage;

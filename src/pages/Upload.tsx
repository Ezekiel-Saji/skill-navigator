import { useState } from "react";
import { PageLayout } from "@/components/layout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Upload, 
  FileText, 
  CheckCircle2, 
  Brain, 
  Loader2,
  AlertCircle,
  ArrowRight
} from "lucide-react";
import { Link } from "react-router-dom";
import { mockSkills } from "@/lib/mockData";

type UploadState = "idle" | "uploading" | "processing" | "complete" | "error";

const UploadPage = () => {
  const [uploadState, setUploadState] = useState<UploadState>("idle");
  const [uploadProgress, setUploadProgress] = useState(0);
  const [fileName, setFileName] = useState("");
  const [dragActive, setDragActive] = useState(false);

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

  const extractedSkills = mockSkills.slice(0, 6);

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
          <Card variant="elevated" className="mb-8">
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
                    Uploading {fileName}
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
                    AI is Analyzing Your CV
                  </h3>
                  <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Extracting skills and experience...
                  </div>
                </div>
              )}

              {uploadState === "complete" && (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-2xl bg-success/10 flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="h-8 w-8 text-success" />
                  </div>
                  <h3 className="font-display font-semibold text-lg mb-2">
                    Analysis Complete!
                  </h3>
                  <p className="text-sm text-muted-foreground mb-6">
                    We extracted {extractedSkills.length} skills from your CV
                  </p>
                  
                  {/* Extracted Skills Preview */}
                  <div className="flex flex-wrap justify-center gap-2 mb-6">
                    {extractedSkills.map((skill) => (
                      <Badge key={skill.id} variant="accent">
                        {skill.name}
                      </Badge>
                    ))}
                  </div>

                  <Link to="/dashboard">
                    <Button variant="hero" size="lg" className="gap-2">
                      View Your Dashboard
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </Link>
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

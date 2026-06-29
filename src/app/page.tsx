import { ResumePage } from "@/features/resume/components/ResumePage";
import { resumeContent } from "@/features/resume/content/resume-content";

export default function Home() {
  return <ResumePage content={resumeContent} />;
}

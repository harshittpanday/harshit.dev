import { notFound } from "next/navigation";
import { projects } from "@/app/data/projects";
import ProjectView from "./ProjectView";

interface Props {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;

  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  return <ProjectView project={project} />;
}
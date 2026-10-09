import type { Project } from "@/lib/projects";
import { ShotSlider } from "@/components/shot-slider";

export function ProjectBody({
  project,
  headingId,
  headingLevel = "h3",
}: {
  project: Project;
  headingId?: string;
  headingLevel?: "h1" | "h2" | "h3";
}) {
  const Heading = headingLevel;

  return (
    <>
      <Heading id={headingId}>{project.title}</Heading>
      <p>{project.description}</p>
      {project.shots.length > 0 ? (
        <ShotSlider key={project.id} shots={project.shots} title={project.title} />
      ) : null}
      {project.href ? (
        <a
          className="project-cta"
          href={project.href}
          target="_blank"
          rel="noopener noreferrer"
        >
          {project.hrefLabel}
        </a>
      ) : null}
    </>
  );
}

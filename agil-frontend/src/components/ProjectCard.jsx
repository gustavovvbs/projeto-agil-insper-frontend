import React from 'react';

export default function ProjectCard({ project, onViewApplications }) {
    return (
        <div className="project-card">
            <h2>{project.descricao}</h2>
            <p><strong>Professor:</strong> {project.professorName}</p>
            <p><strong>Áreas:</strong> {project.temas.join(', ')}</p>
            <button onClick={() => onViewApplications(project.id)}>View Applications</button>
        </div>
    );
}

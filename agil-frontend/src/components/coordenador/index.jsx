import axios from 'axios';
import ProjectCard from '../ProjectCard';
import { useState, useEffect } from 'react';

export default function Coordenador() {
    const [projetos, setProjetos] = useState([]);
    const token = localStorage.getItem('token');

    useEffect(() => {
        if (localStorage.getItem('role') !== 'coordenador') {
            window.location.href = '/login';
        }
    }, []);

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        window.location.href = '/login';
    }

    const getProjetos = async () => {
        try {
          // Fetch projetos
          const response = await axios.get('http://localhost:5000/projeto/', {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          const projetosData = response.data;
    
          // Fetch professor names and update projetos
          const projetosWithProfessorNames = await Promise.all(
            projetosData.map(async (projeto) => {
              if (projeto.professor) {
                const professorResponse = await axios.get(
                  `http://localhost:5000/professor/${projeto.professor}`
                );
                return {
                  ...projeto,
                  professorName: professorResponse.data.nome,
                };
              } else {
                return projeto;
              }
            })
          );
    
          setProjetos(projetosWithProfessorNames);
        } catch (error) {
          console.log(error);
        }
      };
    
    useEffect(() => {
    getProjetos();
    }, []);
    return (
        <div className="coordenador-wrapper">
            <h1>Coordenador</h1>
            <button onClick={logout}>Logout</button>
            {console.log(projetos)}
            {projetos.map((project) => (
                <ProjectCard key = {project.id} project={project} onViewApplications={(projectId) => console.log(projectId)} />
            ))}
          
        </div>
    )
}
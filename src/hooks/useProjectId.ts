
import { useState, useEffect } from 'react';

export function useProjectId() {
  const [projectId, setProjectId] = useState<string>('');

  useEffect(() => {
    // Por enquanto, vamos usar um ID fixo para desenvolvimento
    // Em produção, isso viria do contexto do usuário ou da URL
    const defaultProjectId = localStorage.getItem('current_project_id') || 'project-1';
    setProjectId(defaultProjectId);
  }, []);

  return {
    projectId,
    setProjectId,
  };
}

import React from 'react';
import { ProjectForm } from '../components/ProjectForm';

export const AddProjectPage: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-white">Add New Project</h1>
        <p className="text-sm text-slate-500 mt-0.5">
          Fill in the details below to publish or save a new project
        </p>
      </div>
      <ProjectForm />
    </div>
  );
};

export default AddProjectPage;

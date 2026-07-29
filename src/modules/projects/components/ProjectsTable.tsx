import React, { useState } from 'react';
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from '@hello-pangea/dnd';
import type { Project, SortField, SortDirection } from '../types/project.types';
import { ProjectTableRow } from './ProjectTableRow';
import { ProjectViewDialog } from './ProjectViewDialog';
import { DeleteConfirmDialog } from './DeleteConfirmDialog';
import { ProjectTableSkeleton } from './ProjectTableSkeleton';
import { SearchInput } from '../../../components/admin/SearchInput';
import { Pagination } from '../../../components/admin/Pagination';
import { useProjects } from '../hooks/useProjects';
import { useProjectsSort } from '../hooks/useProjectsSort';
import { PROJECTS_PER_PAGE } from '../constants/project.constants';
import { ArrowUpDown, ArrowUp, ArrowDown, SlidersHorizontal, FilterX } from 'lucide-react';

type SortState = { field: SortField; dir: SortDirection };

const SORT_COLUMNS: { key: SortField; label: string }[] = [
  { key: 'displayOrder', label: 'Order' },
  { key: 'title', label: 'Title' },
  { key: 'createdAt', label: 'Added' },
];

export const ProjectsTable: React.FC = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<SortState>({ field: 'displayOrder', dir: 'asc' });
  const [viewProject, setViewProject] = useState<Project | null>(null);
  const [deleteProject, setDeleteProject] = useState<Project | null>(null);

  const { data, isLoading, isError } = useProjects({
    page,
    limit: PROJECTS_PER_PAGE,
    search,
    sortField: sort.field,
    sortDirection: sort.dir,
  });

  const { mutate: reorder } = useProjectsSort();

  const totalPages = Math.ceil((data?.total ?? 0) / PROJECTS_PER_PAGE);

  const handleSearch = (val: string) => {
    setSearch(val);
    setPage(1);
  };

  const handleSort = (field: SortField) => {
    setSort((prev) =>
      prev.field === field
        ? { field, dir: prev.dir === 'asc' ? 'desc' : 'asc' }
        : { field, dir: 'asc' }
    );
    setPage(1);
  };

  const handleDragEnd = (result: DropResult) => {
    if (!result.destination || !data?.data) return;
    const items = [...data.data];
    const [moved] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, moved);
    const updates = items.map((p, i) => ({ id: p.id, displayOrder: i + 1 }));
    reorder(updates);
  };

  const SortIcon: React.FC<{ field: SortField }> = ({ field }) => {
    if (sort.field !== field) return <ArrowUpDown size={12} className="text-slate-600" />;
    return sort.dir === 'asc'
      ? <ArrowUp size={12} className="text-sky-400" />
      : <ArrowDown size={12} className="text-sky-400" />;
  };

  const displayedProjects = data?.data ?? [];

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchInput
          value={search}
          onChange={handleSearch}
          placeholder="Search projects…"
          className="flex-1"
        />

        {/* Sort buttons */}
        <div className="flex items-center gap-1.5 p-1.5 bg-slate-900 border border-slate-800 rounded-xl shrink-0">
          <SlidersHorizontal size={13} className="text-slate-600 ml-1" />
          {SORT_COLUMNS.map(({ key, label }) => (
            <button
              key={key}
              onClick={() => handleSort(key)}
              className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium transition-all ${
                sort.field === key
                  ? 'bg-slate-800 text-sky-400 border border-slate-700'
                  : 'text-slate-500 hover:text-white'
              }`}
            >
              {label}
              <SortIcon field={key} />
            </button>
          ))}
          {search && (
            <button
              onClick={() => handleSearch('')}
              className="flex items-center gap-1 px-2 py-1 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors"
              title="Clear search"
            >
              <FilterX size={12} />
            </button>
          )}
        </div>
      </div>

      {/* Result count */}
      {!isLoading && !isError && (
        <p className="text-xs text-slate-600">
          {data?.total ?? 0} project{data?.total !== 1 ? 's' : ''} found
          {search && ` for "${search}"`}
        </p>
      )}

      {/* Table body */}
      {isLoading ? (
        <ProjectTableSkeleton />
      ) : isError ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-red-500/10 border border-red-500/20 flex items-center justify-center mb-4">
            <span className="text-2xl">⚠️</span>
          </div>
          <p className="text-slate-300 font-medium">Failed to load projects</p>
          <p className="text-sm text-slate-500 mt-1">
            Check your Supabase connection and credentials
          </p>
        </div>
      ) : displayedProjects.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-800 border border-slate-700 flex items-center justify-center mb-4">
            <span className="text-2xl">🗂️</span>
          </div>
          <p className="text-slate-300 font-medium">No projects found</p>
          <p className="text-sm text-slate-500 mt-1">
            {search ? 'Try a different search term' : 'Add your first project to get started'}
          </p>
        </div>
      ) : (
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="projects-list">
            {(provided) => (
              <div
                {...provided.droppableProps}
                ref={provided.innerRef}
                className="space-y-2"
              >
                {displayedProjects.map((project, index) => (
                  <Draggable
                    key={project.id}
                    draggableId={project.id}
                    index={index}
                  >
                    {(provided, snapshot) => (
                      <div
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        style={{
                          ...provided.draggableProps.style,
                          opacity: snapshot.isDragging ? 0.8 : 1,
                        }}
                      >
                        <ProjectTableRow
                          project={project}
                          dragHandleProps={provided.dragHandleProps as any}
                          onView={setViewProject}
                          onDelete={setDeleteProject}
                        />
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      )}

      {/* Pagination */}
      {!isLoading && !isError && totalPages > 1 && (
        <div className="pt-4 border-t border-slate-800 flex justify-center">
          <Pagination
            page={page}
            totalPages={totalPages}
            total={data?.total ?? 0}
            limit={PROJECTS_PER_PAGE}
            onPageChange={setPage}
          />
        </div>
      )}

      {/* Dialogs */}
      <ProjectViewDialog
        project={viewProject}
        onClose={() => setViewProject(null)}
      />
      <DeleteConfirmDialog
        project={deleteProject}
        onClose={() => setDeleteProject(null)}
      />
    </div>
  );
};

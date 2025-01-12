import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { GripVertical } from 'lucide-react';
import type { Todo } from '../types';

interface Props {
  todo: Todo;
}

export function TodoItem({ todo }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-4 p-4 bg-white rounded-lg shadow-sm border border-gray-200
        transition-all duration-200 ease-in-out
        hover:shadow-md hover:border-indigo-200
        ${isDragging ? 'opacity-50 scale-105 shadow-lg border-indigo-300 bg-indigo-50' : ''}
        animate-fadeIn h-full
      `}
    >
      <button
        {...attributes}
        {...listeners}
        className="touch-none p-1 hover:bg-gray-100 rounded transition-colors duration-200"
      >
        <GripVertical className="h-5 w-5 text-gray-400 transition-transform duration-200 group-hover:scale-110" />
      </button>
      <div className="flex-1 group">
        <h3 className="text-sm font-medium text-gray-900 transition-colors duration-200 group-hover:text-indigo-600">
          {todo.title}
        </h3>
        <p className="text-sm text-gray-500 transition-colors duration-200 group-hover:text-gray-600">
          Assigned to: {todo.user.name}
        </p>
      </div>
    </div>
  );
}
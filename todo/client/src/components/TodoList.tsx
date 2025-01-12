import  { useState } from 'react';
import {
  DndContext,
  DragEndEvent,
  KeyboardSensor,
  PointerSensor,
  closestCenter,
  useSensor,
  useSensors,
  DragStartEvent,
  DragOverlay,
  defaultDropAnimation,
} from '@dnd-kit/core';
import {
  SortableContext,
  arrayMove,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable';
import { TodoItem } from './TodoItem';
import { LayoutGrid, LayoutList } from 'lucide-react';
import type { Todo, TodoListProps } from '../types';

export function TodoList({ items: initialItems }: TodoListProps) {
  const [items, setItems] = useState<Todo[]>(initialItems);
  const [activeId, setActiveId] = useState<string | null>(null);
  const [isGridLayout, setIsGridLayout] = useState(false);
  
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const activeItem = activeId ? items.find(item => item.id === activeId) : null;

  function handleDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string);
  }

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    setActiveId(null);

    if (over && active.id !== over.id) {
      setItems((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        return arrayMove(items, oldIndex, newIndex);
      });
    }
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        {/* <p className="text-sm text-gray-500">
          Drag and drop items to reorder your todo list. You can also use keyboard navigation 
          (Tab + Space/Enter to start dragging, Arrow keys to move, Space/Enter to drop).
        </p> */}
        <button
          onClick={() => setIsGridLayout(!isGridLayout)}
          className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 hover:border-gray-300 transition-colors duration-200"
        >
          {isGridLayout ? (
            <>
              <LayoutList className="w-4 h-4" />
              <span>List View</span>
            </>
          ) : (
            <>
              <LayoutGrid className="w-4 h-4" />
              <span>Grid View</span>
            </>
          )}
        </button>
      </div>

      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={items} 
          strategy={isGridLayout ? horizontalListSortingStrategy : verticalListSortingStrategy}
        >
          <div className={`
            ${isGridLayout 
              ? 'grid grid-cols-2 md:grid-cols-3 gap-4' 
              : 'space-y-3'
            }
          `}>
            {items.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </div>
        </SortableContext>
        <DragOverlay dropAnimation={defaultDropAnimation}>
          {activeItem ? <TodoItem todo={activeItem} /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}
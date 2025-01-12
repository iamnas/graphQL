import { ListChecks } from 'lucide-react';
import { TodoList } from './components/TodoList';
import { gql, useQuery } from '@apollo/client';

function App() {

  const query = gql`
  query GetTodos {
    getTodos {
      id
      title
      user {
        id
        name
        }
      }
    }
  `;

  const { loading, error, data } = useQuery(query);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log(data.getTodos);



  const allTodos = [...data.getTodos];


  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="mb-8 flex items-center gap-3">
          <ListChecks className="h-8 w-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-900">Draggable Todo List</h1>
        </div>

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <TodoList items={allTodos} />
        </div>
      </div>
    </div>
  );
}

export default App;
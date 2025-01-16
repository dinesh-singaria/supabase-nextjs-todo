import { Database } from "@/lib/schema";
import { Session, useSupabaseClient } from "@supabase/auth-helpers-react";
import { useEffect, useState } from "react";
import { IoFilter } from "react-icons/io5";
import DatePicker from "./DatePicker";
import { useCallback } from "react";

type Todos = Database["public"]["Tables"]["todos"]["Row"];

type Users = Database["public"]["Tables"]["users"]["Row"];

export default function TodoList({ session }: { session: Session }) {
  const supabase = useSupabaseClient<Database>();
  const [todos, setTodos] = useState<Todos[]>([]);
  const [newTaskText, setNewTaskText] = useState("");
  const [errorText, setErrorText] = useState("");
  const [users, setUsers] = useState<Users[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null | undefined>(
    null
  );

  useEffect(() => {
    // Fetch users to assign tasks
    const fetchUsers = async () => {
      const { data, error } = await supabase.from("users").select("*");
      // console.log(data)
      if (error) console.error("Error fetching users:", error);
      else setUsers(data || []);
    };
    fetchUsers();
  }, [supabase]);
  // console.log(users);

  const user = session.user;

  const [filter, setFilter] = useState<string | null>(null);

  useEffect(() => {
    const fetchTodos = async () => {
      const { data: todos, error } = await supabase
        .from("todos")
        .select("*")
        .order("id", { ascending: true });

      if (error) console.log("error", error);
      else setTodos(todos);
    };

    fetchTodos();
  }, [supabase]);

  const addTodo = async (taskText: string, assignedTo: string | null) => {
    let task = taskText.trim();
    if (task.length) {
      const { data: todo, error } = await supabase
        .from("todos")
        .insert({
          task,
          user_id: user.id,
          assigned_to: assignedTo,
        })
        .select()
        .single();

      if (error) {
        setErrorText(error.message);
      } else {
        setTodos([...todos, todo]);
        setNewTaskText("");
      }
    }
  };

  // fetchTodos function to apply filters dynamically:
  const fetchTodos = useCallback(async () => {
    let query = supabase
      .from("todos")
      .select("*")
      .order("id", { ascending: true });

    if (filter === "assignedToMe") {
      query = query.eq("assigned_to", user.id);
    } else if (filter === "createdByMe") {
      query = query.eq("user_id", user.id);
    } else if (filter === "overdue") {
      query = query.lt("due_date", new Date().toISOString().split("T")[0]);
    } else if (filter === "dueToday") {
      query = query.eq("due_date", new Date().toISOString().split("T")[0]);
    }

    const { data, error } = await query;

    if (error) console.error("Error fetching todos:", error);
    else setTodos(data || []);
  }, [filter, supabase, user.id]);

  // Call fetchTodos() whenever the filter changes:
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  const deleteTodo = async (id: number) => {
    try {
      await supabase.from("todos").delete().eq("id", id).throwOnError();
      setTodos(todos.filter((x) => x.id != id));
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div className="w-full">
      <h1 className="mb-12">Todo List.</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          if (selectedUser !== undefined) {
            addTodo(newTaskText, selectedUser);
          }
        }}
        className="flex gap-2 my-2"
      >
        <div className="mt-1">
          <button
            className="btn-black"
            onClick={(e) => {
              e.stopPropagation();
              document
                .getElementById("filterDropdown")
                ?.classList.toggle("hidden");
            }}
          >
            <IoFilter />
          </button>
          <div
            id="filterDropdown"
            className="absolute bg-white shadow-md rounded-md hidden z-10 mt-2 p-2"
          >
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                setFilter("assignedToMe");
                document
                  .getElementById("filterDropdown")
                  ?.classList.add("hidden");
              }}
            >
              Tasks Assigned to Me
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                setFilter("createdByMe");
                document
                  .getElementById("filterDropdown")
                  ?.classList.add("hidden");
              }}
            >
              Tasks I Created
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                setFilter("overdue");
                document
                  .getElementById("filterDropdown")
                  ?.classList.add("hidden");
              }}
            >
              Overdue Tasks
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                setFilter("dueToday");
                document
                  .getElementById("filterDropdown")
                  ?.classList.add("hidden");
              }}
            >
              Tasks Due Today
            </button>
            <button
              className="block w-full text-left px-4 py-2 hover:bg-gray-200"
              onClick={() => {
                setFilter(null);
                document
                  .getElementById("filterDropdown")
                  ?.classList.add("hidden");
              }}
            >
              Clear Filter
            </button>
          </div>
        </div>
        <input
          className="border rounded w-full p-2 border-slate-150 "
          type="text"
          placeholder="make coffee"
          value={newTaskText}
          onChange={(e) => {
            setErrorText("");
            setNewTaskText(e.target.value);
          }}
        />
        {/* <button className="btn-black" type="submit">
          Add
        </button> */}

        <select
          className="btn-black "
          onChange={(e) => setSelectedUser(e.target.value)}
          value={selectedUser || ""}
        >
          <option value="">Assign</option>
          {users.map((u) => (
            <option key={u.id} value={u.id}>
              {u.username}
            </option>
          ))}
        </select>

        <button className="btn-black" type="submit">
          Add
        </button>
      </form>
      {!!errorText && <Alert text={errorText} />}
      <div className="bg-white shadow overflow-hidden rounded-md">
        <ul>
          {todos.map((todo) => (
            <Todo
              key={todo.id}
              todo={todo}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

const Todo = ({ todo, onDelete }: { todo: Todos; onDelete: () => void }) => {
  const supabase = useSupabaseClient<Database>();
  const [isCompleted, setIsCompleted] = useState(todo.is_complete);

  const toggle = async () => {
    try {
      const { data } = await supabase
        .from("todos")
        .update({ is_complete: !isCompleted })
        .eq("id", todo.id)
        .throwOnError()
        .select()
        .single();

      if (data) setIsCompleted(data.is_complete);
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <li className="w-full block cursor-pointer hover:bg-200 focus:outline-none focus:bg-200 transition duration-150 ease-in-out">
      <div className="flex items-center px-4 py-4 sm:px-6">
        <div className="min-w-0 flex-1 flex items-center">
          <div className="text-sm leading-5 font-medium truncate">
            {todo.task}
          </div>
        </div>
        <DatePicker
          key={todo.id}
          todoId={todo.id}
          initialDate={todo.due_date || null} // Handle null or missing dates
        />
        <div>
          <input
            className="cursor-pointer"
            onChange={(e) => toggle()}
            type="checkbox"
            checked={isCompleted ? true : false}
          />
        </div>
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete();
          }}
          className="w-4 h-4 ml-2 border-2 hover:border-black rounded"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="gray"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </li>
  );
};

const Alert = ({ text }: { text: string }) => (
  <div className="rounded-md bg-red-100 p-4 my-3">
    <div className="text-sm leading-5 text-red-700">{text}</div>
  </div>
);

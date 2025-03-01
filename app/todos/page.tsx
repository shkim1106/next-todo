import { title } from "@/components/primitives";
import TodosTable from "@/components/todos-table"

async function fetchTodosApiCall() {
	console.log("fetchTodosApiCall called")
	const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "http://localhost:3000"; // 기본값 추가

	const res = await fetch(`${API_BASE_URL}/api/todos/`, {cache: "no-store"})

	const contentTypeCheck = res.headers.get('Content-Type')
	
	if (contentTypeCheck?.includes("text/html")) {
		return null;
	}

	return res.json();
}

export default async function TodosPage() {

	const response = await fetchTodosApiCall();

	const fetchedTodos = response?.data ?? [];

	return ( 
		<div className="flex flex-col space-y-8">
			<h1 className={title()}>Todos</h1>
			<TodosTable todos={fetchedTodos}/>
			{/* <TodosTable todos={[]}/> */}
		</div>
	);
}

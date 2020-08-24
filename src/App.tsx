import React, { useState, useCallback } from "react";

// import { getIP, getNavigator } from "./hooks/getIP";

export interface TodoInterface {
  sel: string;
  text: string;
}

const App: React.FC = () => {
  const [sel, setSel] = useState<string>("POST");
  const [text, setText] = useState<string>("");
  const [list, setList] = useState<TodoInterface[]>([]);
  const [result, setResult] = useState<string>("result...");

  // useEffect(() => {
  //   getIP().then((data) => console.log("IP", data));
  // }, []);

  // useEffect(() => {
  //   getNavigator().then((data) => console.log("Navigator", data));
  // }, []);

  const handleChange = useCallback(
    (e: React.ChangeEvent<HTMLSelectElement>) => {
      const { value } = e.target;
      setSel(value);
    },
    []
  );

  const handleTextChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const { value } = e.target;
      setText(value);
    },
    []
  );

  const handleSignIn = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (sel && text) {
        const newTodo: TodoInterface = {
          sel: sel,
          text: text,
        };

        const newTodosState: TodoInterface[] = [...list];
        newTodosState.push(newTodo);
        setList(newTodosState);

        // http://localhost:4000/auth/login
        const result = await fetch(newTodo.text, {
          method: newTodo.sel,
          credentials: "same-origin",
          headers: {
            "Content-Type": "application/json",
          },
          // 일단 고정
          body: JSON.stringify({
            email: "lsw8168@naver.com",
            password: "1234",
          }),
        });

        // console.log(result);]

        if (result.status === 200) {
          const rrr = await result.json();
          setResult(`status: ${result.status}, message: ${rrr.accessToken}`);
        } else if (result.status === 400) {
          const err = await result.json();
          setResult(
            `status: ${err.error.status}, message: ${err.error.message}`
          );
        }
      } else {
        alert("입력하세요.");
      }
    },
    [sel, text, list]
  );

  return (
    <>
      <div>
        <div>
          <h2>예제</h2>
          <p>POST http://localhost:4000/auth/login</p>
          <p>DELETE http://localhost:4000/auth/logout</p>
        </div>
        <div>
          <h2>List</h2>
          <ul>
            {list.length === 0 ? (
              <li>리스트 없음</li>
            ) : (
              <>
                {list.map((api, i) => (
                  <li key={i}>
                    {api.sel} {api.text}
                  </li>
                ))}
              </>
            )}
          </ul>
        </div>
        <div>
          <div>
            <h2>API</h2>
            <form onSubmit={handleSignIn}>
              <select
                name="select_val"
                onChange={handleChange}
                defaultValue={sel}
              >
                <option value="GET">GET</option>
                <option value="POST">POST</option>
                <option value="DELETE">DELETE</option>
              </select>
              <input
                type="text"
                id="text"
                placeholder="url을 입력하세요."
                onChange={handleTextChange}
              />
              <button type="submit">요청</button>
            </form>
          </div>
          <div>
            <h2>RESULT</h2>
            <div>{result}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default App;

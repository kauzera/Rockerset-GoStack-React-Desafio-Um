import React, { useState, useEffect } from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([]);

  useEffect(() => {
    async function fetchRepositories() {
      const repos = await api.get("/repositories");
      setRepositories(repos.data);
    }

    fetchRepositories();
  }, []);

  async function handleAddRepository() {
    const response = await api.post("/repositories", {
      title: `Novo repositorio ${Date.now()}`,
      url: "http://novoprojeto.com.br",
      techs: ["Node.js", "C#", "Javascript"],
    });

    const repository = response.data;
    setRepositories([...repositories, repository]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);
    setRepositories(repositories.filter((repository) => repository.id !== id));
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map((repository) => (
          <li key={repository.id}>
            {repository.title}
            <button onClick={() => handleRemoveRepository(repository.id)}>
              Remover
            </button>
          </li>
        ))}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;

import type { User } from "../types/user";
import { useEffect, useState } from "react";
import { UserCard } from "./UserCard";

export function UserDirectory() {
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [search, setSearch] = useState("");

  useEffect(() => {
    async function getUsers() {
      try {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/users`,
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data: User[] = await response.json();
        setUsers(data);
      } catch (err) {
        console.error(err);
        setError("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    }
    getUsers();
  }, []);

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(search.toLowerCase()) ||
      user.email.toLowerCase().includes(search.toLowerCase()),
  );

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <div>
      <div>
        <label htmlFor="search">Search</label> <br />
        <input
          type="text"
          placeholder="Wanna search anyone?"
          id="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />{" "}
        <br />
      </div>
      <ul>
        {filteredUsers.map((user) => (
          <li key={user.id}>
            <UserCard user={user} />
          </li>
        ))}
      </ul>
    </div>
  );
}

import type { User } from "../types/user";
import { useEffect, useState } from "react";

export function UserDirectory() {
    const [users, setUsers] = useState<User[]>([]);

    useEffect(() => {
        async function getUsers() {
            
            const response = await fetch (`https://jsonplaceholder.typicode.com/users`);

            if(!response.ok){
                throw new Error("Failed to fetch data");
            }

            const data: User[] = await response.json();
            setUsers(data);
        }
        getUsers()

    }, []);
    return(<p>
        {users.length} users loaded
    </p>);
}
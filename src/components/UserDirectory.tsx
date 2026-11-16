import type { User } from "../types/user";
import { useEffect, useState } from "react";

export function UserDirectory() {
    const [users, setUsers] = useState<User[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {     
         async function getUsers() {
            try{
            
            const response = await fetch (`https://jsonplaceholder.typicode.com/userss`);

            if(!response.ok){
                throw new Error("Failed to fetch data");
            }

            const data: User[] = await response.json();
            setUsers(data);
        }
    
       catch(error){
        setError("Something went wrong");

       }
       finally {
        setIsLoading(false);
       }
    }
    getUsers();

    }, []);

    if(isLoading){
        return <p>Loading...</p>
    }

    if(error) {
        return <p>Error: {error}</p>
    }
    return(<p>
        {users.length} users loaded
    </p>);
}
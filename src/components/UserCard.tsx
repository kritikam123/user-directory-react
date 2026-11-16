import type { User } from "../types/user";

interface UserCardProps {
    user: User;
}

export function UserCard({user}: UserCardProps) {
    return(
        <div>
            <h2>{user.name}</h2>
            <p>{user.email}</p>
            <p>{user.address.city}</p>
        </div>
    );
}
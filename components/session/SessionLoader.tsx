import { getUserSession } from "@/lib/session";
import { SessionSync } from "./SessionSync";

export async function SessionLoader() {
    const user = await getUserSession();
    return <SessionSync user={user}/>
}
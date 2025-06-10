
import { WriteJSON } from "@/app/utils/utils";
import { getAllUsers } from "@/db/services/user/queries";

export async function GET(r: Request) {
    const users = await getAllUsers();
    console.log("users", users);
    return WriteJSON(200, users);
}

import { getCurrentUser } from "@/lib/current-user";
import NavbarClient from "./NavbarClient";

const Navbar = async () => {

    const user = await getCurrentUser()
    return (
        <NavbarClient user={user} />
    );
}

export default Navbar;
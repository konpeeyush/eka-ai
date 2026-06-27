import { AuthGuard } from "@/modules/auth/ui/components/auth-guard"
import { OrganizationGuard } from "@/modules/auth/ui/components/organization-guard";

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="min-h-screen min-w-screen flex flex-col justify-center items-center">
        <AuthGuard>
            <OrganizationGuard>
                {children}
            </OrganizationGuard>
        </AuthGuard>
        </div>
    )
}

export default Layout;
import { DashboardLayout } from "@/modules/dashboard/ui/layouts/dashboard-layout"

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className="flex min-h-screen min-w-screen flex-col items-center justify-center">
            <DashboardLayout>{children}</DashboardLayout>
        </div>
    )
}

export default Layout

import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { Providers } from "@/components/Providers";

export default function AdminPanelLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <div className="flex min-h-screen bg-background">
        <AdminSidebar />
        <main className="flex-1 p-8 overflow-auto">{children}</main>
      </div>
    </Providers>
  );
}

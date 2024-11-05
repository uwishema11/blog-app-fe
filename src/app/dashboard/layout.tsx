import LeftSectionsDashboard from "@/components/dashboard/layout/LeftSection";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <LeftSectionsDashboard />
      <main className="flex-1 p-8">{children}</main>
    </div>
  );
}

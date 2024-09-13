

import Sidebar from "@/components/Sidebar";

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {


    return (
        <main className="flex h-full w-full font-inter">
            <Sidebar />
            <div className="flex-1">{children}</div>
        </main>
    );
}

export default function WelcomeLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex">
            <div id="highlights" className="w-4/5 bg-light-blue-600 min-h-screen" />
            <main className="w-2/5 bg-blue-gray-50 min-h-screen flex justify-center items-center px-8">
                { children }
            </main>
        </div>
    )
}
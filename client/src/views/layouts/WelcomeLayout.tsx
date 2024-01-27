export default function WelcomeLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex justify-center bg-slate-100">
      <div
        id="highlights"
        className="w-4/5 bg-sky-400 min-h-screen hidden xl:block"
      />
      <main className="w-full xl:w-2/5 min-h-screen flex justify-center items-center px-2 xl:px-8">
        {children}
      </main>
    </div>
  );
}

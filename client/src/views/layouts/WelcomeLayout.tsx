import packageJSON from "../../../../package.json";

export interface WelcomeLayoutProps {
  children: React.ReactNode;
  highlight?: React.ReactNode;
}

export default function WelcomeLayout({
  children,
  highlight,
}: WelcomeLayoutProps) {
  return (
    <div className="flex justify-center bg-slate-100">
      <div
        id="highlights"
        className={`hidden min-h-screen w-4/5 bg-sky-400
          bg-cover xl:block`}
      >
        {highlight}
      </div>
      <main className="relative min-h-screen w-full px-2 xl:w-2/5 xl:px-8">
        <div className="flex h-full w-full flex-col items-center justify-center">
          {children}
        </div>
        <div className="absolute bottom-0 right-2">
          <p className="text-gray-400">Versão do app: {packageJSON.version}</p>
        </div>
      </main>
    </div>
  );
}

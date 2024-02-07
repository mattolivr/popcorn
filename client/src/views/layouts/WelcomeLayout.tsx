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
    <div className="flex justify-center bg-sky-500 xl:bg-slate-100">
      <div
        id="highlights"
        className={`hidden min-h-screen w-4/5 bg-sky-400
          bg-cover xl:block`}
      >
        {highlight}
      </div>
      <main className="relative h-svh w-full px-4 xl:w-2/5 xl:px-8">
        <div className="flex h-full w-full flex-col items-center justify-center">
          {children}
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <p className="flex justify-center text-white xl:text-gray-400">
            Versão do app: {packageJSON.version}
          </p>
        </div>
      </main>
    </div>
  );
}

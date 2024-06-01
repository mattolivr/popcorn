import Card from "../../components/card/Card";

export interface DialogLayoutProps {
  title?: string;
  children: React.ReactNode;
}

export default function DialogLayout(props: DialogLayoutProps): JSX.Element {
  const { children, title } = props;

  return (
    <div className="flex min-h-lvh items-center justify-center bg-gradient-to-br from-sky-500 to-sky-300 px-2 sm:px-0">
      <Card
        title={<Card.Title text={title} />}
        className="flex w-10/12 flex-col gap-2 sm:w-3/5 lg:w-1/2 2xl:w-4/12"
      >
        {children}
      </Card>
    </div>
  );
}

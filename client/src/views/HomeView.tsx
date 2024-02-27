import { FaPaperPlane } from "react-icons/fa";
import { FaImage, FaMessage, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";

export default function HomeView(): JSX.Element {
  return (
    <div className="mt-4 flex w-full flex-col gap-4 px-2 md:w-[700px]">
      <NewPost />
    </div>
  );
}

function NewPost(): JSX.Element {
  return (
    <Card>
      <form action="">
        <div className="flex flex-row gap-3">
          <div className="hidden h-[56px] w-10 items-center sm:flex">
            <Link
              to="/users"
              className="block h-10 w-10 rounded-full bg-orange-300"
            />
          </div>
          <textarea
            className="no-scrollbar block h-[56px] min-h-[56px] flex-1 rounded-lg 
            border-2 border-gray-100 bg-gray-100 px-2 py-1 focus:border-sky-500 
            focus:outline-sky-500 disabled:pointer-events-none disabled:opacity-50"
            onInput={autoResize}
            placeholder="Crie uma nova postagem..."
          ></textarea>
        </div>
        <ul className="ml-10 flex items-center justify-end pl-3 pt-2 sm:gap-1">
          <li>
            <Button color="transparent" icon={FaImage} />
          </li>
          <li>
            <Button color="transparent" icon={FaMessage} />
          </li>
          <li>
            <Button color="transparent" icon={FaX} />
          </li>
          <li>
            <Button color="primary" icon={FaPaperPlane}>
              Enviar
            </Button>
          </li>
        </ul>
      </form>
    </Card>
  );
}

function autoResize(event: React.FormEvent<HTMLTextAreaElement>): void {
  const style = event.currentTarget.style;
  const offsetTop = 0;

  style.height = "auto";
  style.height = `${event.currentTarget.scrollHeight + offsetTop}px`;
}

import { Link } from "react-router-dom";
import Card from "../components/Card";
import { MainLayout } from "./layouts/MainLayout";
import { useForm } from "react-hook-form";
import Button from "../components/Button";
import { FaImage } from "react-icons/fa6";
import { FaComment, FaPaperPlane, FaTrash } from "react-icons/fa";

export default function HomeView() {
  return (
    <MainLayout>
      <div className="mt-4 w-[700px] px-2">
        <NewPost />
      </div>
    </MainLayout>
  );
}

function NewPost() {
  const { handleSubmit, register } = useForm();

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
        <ul className="ml-10 flex items-center justify-end pl-3 pt-2 sm:gap-3">
          <li>
            <Button className="p-[0px]" variant="blank" icon={FaImage}>
              <span className="hidden sm:block">Mídias</span>
            </Button>
          </li>
          <li>
            <Button className="p-0" variant="blank" icon={FaComment}>
              <span className="hidden sm:block">Novo Tópico</span>
            </Button>
          </li>
          <li>
            <Button className="p-0" variant="blank" icon={FaTrash}>
              <span className="hidden sm:block">Cancelar</span>
            </Button>
          </li>
          <li>
            <Button icon={FaPaperPlane}>Enviar</Button>
          </li>
        </ul>
      </form>
    </Card>
  );
}

function autoResize(event: React.FormEvent<HTMLTextAreaElement>) {
  const style = event.currentTarget.style;
  const offsetTop = 0;

  style.height = "auto";
  style.height = `${event.currentTarget.scrollHeight + offsetTop}px`;
}

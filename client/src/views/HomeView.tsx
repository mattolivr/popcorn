import { FaPaperPlane } from "react-icons/fa";
import { FaImage, FaMessage, FaX } from "react-icons/fa6";
import { Link } from "react-router-dom";
import Button from "../components/Button";
import Card from "../components/Card";
import Input from "../components/Input";

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
          <Input type="textarea" placeholder="O que está pensando?..." />
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

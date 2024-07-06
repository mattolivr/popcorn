import { Avatar } from "flowbite-react";
import { FaBell, FaEnvelope, FaHouse, FaPlus } from "react-icons/fa6";
import Button from "../../../components/button/Button";

export function MainLayoutBottomNavigation(): JSX.Element {
  return (
    <div className="fixed bottom-0 z-50 w-full">
      <div className="flex h-12 w-full flex-row items-center bg-sky-500 px-2 md:hidden">
        <Button icon={FaHouse} to="/" className="w-full" />
        <Button icon={FaEnvelope} to="/messages" className="w-full" />
        <Button icon={FaPlus} className="w-full" />
        <Button icon={FaBell} to="/notifications" className="w-full" />
        <Button to="/users" className="w-full">
          <Avatar size="xs" rounded />
        </Button>
      </div>
    </div>
  );
}

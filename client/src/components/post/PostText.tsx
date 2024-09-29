import { fakerPT_BR as faker } from "@faker-js/faker";

export default function PostText(): React.ReactNode {
  return <p>{faker.lorem.paragraphs(faker.number.int({ min: 1, max: 3 }))}</p>;
}

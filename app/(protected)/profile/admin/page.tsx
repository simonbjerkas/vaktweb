import { CreateNewHallForm } from "./create-hall-form";
import { CreateNewLocationForm } from "./create-location-form";

export default function Admin() {
  return (
    <div className="flex flex-col gap-4 w-fit">
      <CreateNewLocationForm />
      <CreateNewHallForm />
    </div>
  );
}

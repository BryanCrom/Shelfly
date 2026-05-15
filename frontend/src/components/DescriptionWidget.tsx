import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState } from "react";

type DescriptionProps = {
  description: string | undefined;
};

const DescriptionWidget = (props: DescriptionProps) => {
  const [openDescription, setOpenDescription] = useState<boolean>(true);

  return (
    <button
      onClick={() => setOpenDescription(!openDescription)}
      className="hover:bg-base-100 mx-10 rounded-2xl p-4"
    >
      {openDescription ? (
        <p className="mx-10 truncate text-left text-2xl">
          <span className="flex justify-between text-left font-bold underline">
            Description:
            <IconChevronDown size={35} />
          </span>{" "}
          {props.description}
        </p>
      ) : (
        <p className="mx-10 text-left text-2xl break-all">
          <span className="flex justify-between text-left font-bold underline">
            Description:
            <IconChevronUp size={35} />
          </span>{" "}
          {props.description}
        </p>
      )}
    </button>
  );
};

export default DescriptionWidget;

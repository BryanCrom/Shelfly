import { IconChevronDown, IconChevronUp } from "@tabler/icons-react";
import { useState, type HTMLAttributes } from "react";
import useIsOverflowing from "../hooks/useIsOverflowing";
import { twMerge } from "tailwind-merge";

interface ReviewDescriptionProps extends HTMLAttributes<HTMLButtonElement> {
  description: string | undefined;
}

const Description = ({
  description,
  className,
  ...props
}: ReviewDescriptionProps) => {
  const [openDescription, setOpenDescription] = useState<boolean>(false);

  const [ref, isOverflowing] =
    useIsOverflowing<HTMLParagraphElement>(openDescription);

  return (
    <button
      {...props}
      type="button"
      className={twMerge(
        `${(isOverflowing || openDescription) && "hover:bg-base-100"} w-full rounded-xl p-2 text-left`,
        className,
      )}
      onClick={() => setOpenDescription((prev) => !prev)}
      disabled={!isOverflowing && !openDescription}
    >
      {(isOverflowing || openDescription) &&
        (openDescription ? <IconChevronUp /> : <IconChevronDown />)}
      <div>
        <p ref={ref} className={openDescription ? "break-all" : "truncate"}>
          {description}
        </p>
      </div>
    </button>
  );
};

export default Description;

interface DetailTextProps {
  title: string;
  content: string | string[] | undefined;
}

const DetailText = (props: DetailTextProps) => {
  return (
    <p className="text-base-content mb-5 text-2xl">
      <span className="font-bold">{props.title} </span>
      {props.content}
    </p>
  );
};

export default DetailText;

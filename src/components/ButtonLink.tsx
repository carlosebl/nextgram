import Link from "next/link";

type ButtonLinkProps = {
  text: string;
  url: string;
};

const ButtonLink: React.FC<ButtonLinkProps> = ({ text, url }) => {
  return <Link href={url} className="w-fit h-8 bg-blue-800 hover:bg-blue-700 rounded cursor-pointer text-sm font-medium text-white py-1 px-6 flex items-center">{text}</Link>;
};

export default ButtonLink;

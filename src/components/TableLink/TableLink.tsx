import { Link, type To } from 'react-router-dom';

interface Props {
  to: To;
  title: string;
}

export const TableLink = ({ to, title }: Props) => {
  return (
    <Link to={to} className="hover:underline">
      <span>{title}</span>
    </Link>
  );
};

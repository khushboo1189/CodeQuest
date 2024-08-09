import { Link, useLocation, useNavigate } from 'react-router-dom'

interface NavLinksProps {
  href: string;
  name: string;
  key: number;
}

function NavLinks({ href, name }: NavLinksProps) {
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    if (location.pathname === href) {
      e.preventDefault();
      window.scrollTo(0, 0);
      navigate(href);
    }
  }

  return (
    <Link key={name} to={href} onClick={handleClick}
      className={
        location.pathname === href ||
          (name === "Problems" &&
            location.pathname.startsWith("/problem/")) // Check if pathname starts with "/problem/"
          ? "active"
          : ""
      }> {name} </Link>
  );
}

export default NavLinks
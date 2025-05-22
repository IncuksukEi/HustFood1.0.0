import "../../assets/base.css";

function Header() {
  return (
    <header>
      <div className="menu-toggle">
        <label htmlFor="navbar-toggle">
          <span className="las la-bars"></span>
        </label>
      </div>
      <div className="search">
        <input type="search" placeholder="Muốn tìm gì nào?" />
        <span className="las la-search"></span>
      </div>
      <div className="header-icons"></div>
    </header>
  );
}

export default Header;

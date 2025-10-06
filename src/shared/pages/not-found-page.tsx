import type { FC } from "react";
// If you use react-router, uncomment this:
// import { Link } from "react-router-dom";
import s from "./NotFound.module.scss";

const NotFoundPage: FC = () => {
  return (
    <section className={s.root}>
      {/* Breadcrumb */}
      <nav className={`container ${s.breadcrumb}`} aria-label="Breadcrumb">
        <ol className={s.bcList}>
          <li className={s.bcItem}>
            {/* If using react-router: <Link to="/">Home</Link> */}
            <a href="/" className={s.bcLink}>
              Home
            </a>
          </li>
          <li className={`${s.bcItem} ${s.current}`} aria-current="page">
            404 Error
          </li>
        </ol>
      </nav>

      {/* Main content */}
      <div className={`container ${s.wrapper}`}>
        <h1 className={s.title}>404 Not Found</h1>
        <p className={s.desc}>
          Your visited page not found. You may go home page.
        </p>

        {/* If using react-router: <Link to="/" className={s.btn}>Back to home page</Link> */}
        <a href="/" className={s.btn} role="button">
          Back to home page
        </a>
      </div>
    </section>
  );
};

export default NotFoundPage;

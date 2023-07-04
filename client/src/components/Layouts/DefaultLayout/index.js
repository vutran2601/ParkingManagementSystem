import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import styles from "./DefaultLayout.module.css";

function DefaultLayout({ children }) {
  return (
    <div className="d-flex">
      <Sidebar></Sidebar>

      <div className={styles.container}>
        <Header></Header>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
}

export default DefaultLayout;

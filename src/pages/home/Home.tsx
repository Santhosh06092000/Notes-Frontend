import "./Home.scss";
import { FunctionComponent, useMemo } from "react";
import { HomeProps } from "./IHome";
import Typography from "../../components/Typography/Typography";
import { NavLink, Outlet } from "react-router";
import { motion } from "motion/react";
import { decode } from "../../utils/hashing";

const Home: FunctionComponent<HomeProps> = () => {
  const user = decode(localStorage.getItem("user"));

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
  };

  const userGreetings = useMemo(
    () => `${getGreeting()} ${user?.user_name} !`,
    []
  );

  return (
    <div className="home">
      <header className="home-header">
        <Typography variant="h1" weight="medium">
          Keep Notes
        </Typography>
        <span className="menu-list">
          {menuList.map((menu) => {
            return (
              <NavLink
                to={menu.to}
                key={menu.to}
                style={{ textDecoration: "none" }}
                onClick={menu?.actions}
              >
                {({ isActive }) => (
                  <span
                    style={{
                      color: "rgb(30, 116, 137)",
                      fontSize: isActive ? "1.2rem" : "inherit",
                      fontWeight: isActive ? "1000" : "inherit",
                    }}
                  >
                    {menu.menu}
                  </span>
                )}
              </NavLink>
            );
          })}
        </span>
      </header>

      <section className="home-section">
        <h1 style={{ fontSize: "2rem" }}>
          {userGreetings.split("").map((char, i) => (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{
                duration: 0.25,
                delay: i / 10,
              }}
              key={i}
            >
              {char}
            </motion.span>
          ))}
        </h1>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{
            delay: userGreetings.split("").length / 10,
            duration: 0.25,
          }}
          className="main"
        >
          <Outlet />
        </motion.div>
      </section>
    </div>
  );
};

export default Home;

const menuList = [
  {
    menu: "About",
    to: "/about",
  },
  {
    menu: "Notes",
    to: "/notes",
  },
  {
    menu: "Account",
    to: "/account",
  },
  {
    menu: "Logout",
    to: "/sign-in",
    actions: () => {
      localStorage.clear();
    },
  },
];

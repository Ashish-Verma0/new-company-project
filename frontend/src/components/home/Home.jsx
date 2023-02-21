import React from "react";

const Home = () => {
  const data = [
    {
      name: "option1",
    },
    {
      name: "option2",
    },
    {
      name: "option3",
    },
    {
      name: "option4",
    },
    {
      name: "option5",
    },
  ];

  const userData = JSON.parse(localStorage.getItem("userData"));
  console.log(userData);
  return (
    <div
      class="d-flex flex-column flex-shrink-0 p-3 text-white bg-dark"
      style={{ width: "280px", height: "100vh" }}
    >
      <a
        href="/"
        class="d-flex align-items-center mb-3 mb-md-0 me-md-auto text-white text-decoration-none"
      >
        <span class="fs-4">Sidebar</span>
      </a>
      <hr />
      <ul class="nav nav-pills flex-column mb-auto">
        {data.map((elem) => {
          const { name } = elem;
          if (userData.role === "admin") {
            return (
              <li class="nav-item" key={name}>
                <a href="#" class="nav-link " aria-current="page">
                  {name}
                </a>
              </li>
            );
          } else {
            if (userData.dashboard[name]) {
              return (
                <li class="nav-item" key={name}>
                  <a href="#" class="nav-link " aria-current="page">
                    {name}
                  </a>
                </li>
              );
            }
          }
        })}
      </ul>
      <hr />
      <div class="dropdown">
        <a
          href="#"
          class="d-flex align-items-center text-white text-decoration-none dropdown-toggle"
          id="dropdownUser1"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            src="https://github.com/mdo.png"
            alt=""
            width="32"
            height="32"
            class="rounded-circle me-2"
          />
          <strong>mdo</strong>
        </a>
        <ul
          class="dropdown-menu dropdown-menu-dark text-small shadow"
          aria-labelledby="dropdownUser1"
        >
          <li>
            <a class="dropdown-item" href="#">
              New project...
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Settings
            </a>
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Profile
            </a>
          </li>
          <li>
            <hr class="dropdown-divider" />
          </li>
          <li>
            <a class="dropdown-item" href="#">
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Home;

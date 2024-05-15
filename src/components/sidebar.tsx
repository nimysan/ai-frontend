import { Sidebar, TextInput } from "flowbite-react";
import type { FC } from "react";
import { useEffect, useState } from "react";
import {
  HiChartPie,
  HiClipboard,
  HiCollection,
  HiInformationCircle,
  HiLogin,
  HiOutlineChat,
  HiSearch,
} from "react-icons/hi";
import isAuthenticated from "../auth";

const ExampleSidebar: FC = function () {
  const [currentPage, setCurrentPage] = useState("");
  const isAuth = isAuthenticated();
  useEffect(() => {
    const newPage = window.location.pathname;

    setCurrentPage(newPage);
  }, [setCurrentPage]);

  return (
    <Sidebar aria-label="Sidebar with multi-level dropdown example">
      <div className="flex h-full flex-col justify-between py-2">
        <div>
          <form className="pb-3 md:hidden">
            <TextInput
              icon={HiSearch}
              type="search"
              placeholder="Search"
              required
              size={32}
            />
          </form>
          <Sidebar.Items>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="/bedrock/chat"
                icon={HiOutlineChat}
                className={
                  "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                Chat
              </Sidebar.Item>
              {/* <Sidebar.Item
                href="/"
                icon={HiChartPie}
                className={
                  "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                Dashboard
              </Sidebar.Item> */}
              <Sidebar.Item
                href="/bedrock/configure"
                icon={HiChartPie}
                className={
                  "/" === currentPage ? "bg-gray-100 dark:bg-gray-700" : ""
                }
              >
                Bedrock
              </Sidebar.Item>

              {/* <Sidebar.Item
                href="/e-commerce/products"
                icon={HiShoppingBag}
                className={
                  "/e-commerce/products" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Products
              </Sidebar.Item> */}
              {/* <Sidebar.Item
                href="/users/list"
                icon={HiUsers}
                className={
                  "/users/list" === currentPage
                    ? "bg-gray-100 dark:bg-gray-700"
                    : ""
                }
              >
                Users list
              </Sidebar.Item> */}
              <Sidebar.Item href="/authentication/sign-in" icon={HiLogin}>
                {isAuth ? "Login Out" : "Sign In"}
              </Sidebar.Item>
              {/* <Sidebar.Item href="/authentication/sign-up" icon={HiPencil}>
                Sign up
              </Sidebar.Item> */}
            </Sidebar.ItemGroup>
            <Sidebar.ItemGroup>
              <Sidebar.Item
                href="https://aws.amazon.com/bedrock/faqs/?refid=1325fdf1-f38b-4c89-8bf9-dc39eeb87ff8"
                icon={HiClipboard}
              >
                Docs
              </Sidebar.Item>
              <Sidebar.Item
                href="https://flowbite-react.com/"
                icon={HiCollection}
              >
                Components
              </Sidebar.Item>
              <Sidebar.Item
                href="https://github.com/themesberg/flowbite-react/issues"
                icon={HiInformationCircle}
              >
                Help
              </Sidebar.Item>
            </Sidebar.ItemGroup>
          </Sidebar.Items>
        </div>
      </div>
    </Sidebar>
  );
};

export default ExampleSidebar;

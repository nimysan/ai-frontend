/* eslint-disable jsx-a11y/anchor-is-valid */
import { Button, Card, Checkbox, Label, TextInput } from "flowbite-react";
import { useState, type FC } from "react";
import { useNavigate } from "react-router-dom";
import { useForm, Controller } from "react-hook-form";
import axios from "axios";

const SignInPage: FC = function () {
  // loginOut();

  interface LoginFormData {
    email: string;
    password: string;
  }
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState<string>("");

  const authenticateUser = async (email: any, password: any) => {
    try {
      const response = await axios.post("/user/login", {
        username: email,
        password: password,
      });
      // debugger;
      const userData = response.data;

      // 将用户数据存储在 localStorage 中
      localStorage.setItem("userData", JSON.stringify(userData.user));
      localStorage.setItem("authToken", userData.user.user_token);
      setErrorMessage("");
      return userData;
    } catch (error) {
      // console.error("Authentication failed:", error);
      setErrorMessage("Authentication failed.");
      throw error;
    }
  };
  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<LoginFormData>();

  const onSubmit = async (data: LoginFormData) => {
    // 在这里执行身份验证逻辑，例如向服务器发送请求
    const isAuthenticated = await authenticateUser(data.email, data.password);
    if (isAuthenticated) {
      // 如果身份验证成功，则导航到首页
      navigate("/bedrock/chat");
    } else {
      // 如果身份验证失败，则显示错误消息或执行其他操作
      console.error("Authentication failed");
    }
  };
  return (
    <div className="flex flex-col items-center justify-center px-6 lg:h-screen lg:gap-y-12">
      <div className="my-6 flex items-center gap-x-1 lg:my-0">
        <img
          alt="Flowbite logo"
          src="https://flowbite.com/docs/images/logo.svg"
          className="mr-3 h-12"
        />
        <span className="self-center whitespace-nowrap text-2xl font-semibold dark:text-white">
          AI Server Proxy
        </span>
      </div>
      <Card
        horizontal
        // imgSrc="/images/authentication/login.jpg"
        // imgAlt=""
        className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Sign in to platform
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your username</Label>
            <Controller
              name="email"
              control={control}
              defaultValue=""
              rules={{ required: "请输入用户名" }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  id="email"
                  type="text"
                  defaultValue="admin"
                  placeholder="请输入登录用户名"
                  required={true}
                />
              )}
            />
            {/* {errors.username && <span>{errors.username.message}</span>} */}
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <Controller
              name="password"
              control={control}
              defaultValue=""
              rules={{ required: "请输入密码" }}
              render={({ field }) => (
                <input {...field} type="password" id="password" />
              )}
            />
            {errors.password && <span>{errors.password.message}</span>}
          </div>
          <div className="mb-6 flex items-center justify-between">
            <div className="flex items-center gap-x-3">
              <Checkbox id="rememberMe" name="rememberMe" />
              <Label htmlFor="rememberMe">Remember me</Label>
            </div>
            <a
              href="#"
              className="w-1/2 text-right text-sm text-primary-600 dark:text-primary-300"
            >
              Lost Password?
            </a>
          </div>
          <div className="mb-6">
            <Button type="submit" className="w-full lg:w-auto">
              Login to your account
            </Button>
          </div>
          {errorMessage && (
            <div className="mb-4 text-red-500">{errorMessage}</div>
          )}
          <p className="hidden text-sm text-gray-500 dark:text-gray-300">
            Not registered?&nbsp;
            <a href="#" className="text-primary-600 dark:text-primary-300">
              Create account
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignInPage;

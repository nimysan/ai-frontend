/* eslint-disable jsx-a11y/anchor-is-valid */
import {
  Button,
  Card,
  Checkbox,
  Label,
  TextInput,
  Spinner,
} from "flowbite-react";

import { useState } from "react";
import type { FC, FormEvent } from "react";

const SignUpPage: FC = function () {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);
    // 在这里添加调用后端接口的代码
    // 例如使用 fetch 或者 axios 发送 POST 请求
    try {
      // 模拟异步操作
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setSuccess(true);
    } catch (error) {
      setError("Registration failed. Please try again.");
    } finally {
      setLoading(false);
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
        // imgSrc="/images/authentication/create-account.jpg"
        // imgAlt=""
        className="w-full md:max-w-screen-sm [&>img]:hidden md:[&>img]:w-96 md:[&>img]:p-0 md:[&>*]:w-full md:[&>*]:p-16 lg:[&>img]:block"
      >
        <h1 className="mb-3 text-2xl font-bold dark:text-white md:text-3xl">
          Create Account
        </h1>
        <form onSubmit={handleSubmit}>
          {error && <p className="mb-4 text-red-500">{error}</p>}
          {success && (
            <p className="mb-4 text-green-500">Registration successful!</p>
          )}
          <div className="mb-4 flex flex-col gap-y-3">
            <Label htmlFor="email">Your email</Label>
            <TextInput
              id="email"
              name="email"
              placeholder="name@company.com"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="password">Your password</Label>
            <TextInput
              id="password"
              name="password"
              placeholder="••••••••"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 flex flex-col gap-y-3">
            <Label htmlFor="confirmPassword">Confirm password</Label>
            <TextInput
              id="confirmPassword"
              name="confirmPassword"
              placeholder="••••••••"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </div>
          <div className="mb-6 flex items-center gap-x-3">
            <Checkbox
              id="acceptTerms"
              name="acceptTerms"
              checked={acceptTerms}
              onChange={(e) => setAcceptTerms(e.target.checked)}
              required
            />
            <Label htmlFor="acceptTerms">
              I accept the&nbsp;
              <a href="#" className="text-primary-700 dark:text-primary-200">
                Terms and Conditions
              </a>
            </Label>
          </div>
          <div className="mb-7">
            <Button
              type="submit"
              className="w-full lg:w-auto"
              disabled={loading}
            >
              {loading ? <Spinner aria-label="Loading..." /> : "Create account"}
            </Button>
          </div>
          <p className="text-sm text-gray-500 dark:text-gray-300">
            Already have an account?&nbsp;
            <a
              href="/authentication/sign-in"
              className="text-primary-600 dark:text-primary-200"
            >
              Login here
            </a>
          </p>
        </form>
      </Card>
    </div>
  );
};

export default SignUpPage;

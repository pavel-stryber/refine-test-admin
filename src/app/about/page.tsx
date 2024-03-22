import { AuthPage } from "@components/auth-page";
import { authProviderServer } from "@providers/auth-provider";
import { redirect } from "next/navigation";
import { Layout as BaseLayout } from "@components/layout";

export default async function About() {
  // const data = await getData();

  // if (data.authenticated) {
  //   redirect(data?.redirectTo || "/");
  // }

  return <BaseLayout>
    <h1>About page</h1>
  </BaseLayout>
}

// async function getData() {
//   const { authenticated, redirectTo, error } = await authProviderServer.check();
//
//   return {
//     authenticated,
//     redirectTo,
//     error,
//   };
// }

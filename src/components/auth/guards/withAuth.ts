import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { requireAuth, type AuthenticatedUser } from "../server/authorization";

type WithUser<P> = P & { user: AuthenticatedUser };

export function withAuth<P extends Record<string, unknown>>(
  handler?: GetServerSideProps<P>
): GetServerSideProps<WithUser<P>> {
  return async (ctx: GetServerSidePropsContext) => {
    const user = await requireAuth(ctx.req.headers.cookie);

    if (!user) {
      return {
        redirect: {
          destination: "/login",
          permanent: false,
        },
      };
    }

    if (!handler) {
      return {
        props: {
          user,
        } as WithUser<P>,
      };
    }

    const result = await handler(ctx);

    if ("props" in result) {
      return {
        ...result,
        props: {
          ...(result.props as P),
          user,
        } as WithUser<P>,
      };
    }

    return result;
  };
}
import type { GetServerSideProps, GetServerSidePropsContext } from "next";
import { requireRole, type AuthenticatedUser } from "../server/authorization";
import type { Role } from "../permissions/roles";

type WithUser<P> = P & { user: AuthenticatedUser };

export function withRole<P extends Record<string, unknown>>(
  allowedRoles: Role[],
  handler?: GetServerSideProps<P>
): GetServerSideProps<WithUser<P>> {
  return async (ctx: GetServerSidePropsContext) => {
    const user = await requireRole(ctx.req.headers.cookie, allowedRoles);

    if (!user) {
      return {
        redirect: {
          destination: "/dashboard",
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
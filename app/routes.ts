import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  index("routes/auth/login/login.staff.tsx"),
  //    route("login", "routes/auth/login.tsx"),
  //   route("verify", "routes/auth/verify.tsx"),

  layout("layouts/owner.layout.tsx", [
    route("owner/staff/list", "routes/owner/staff/staff.list.tsx"),
    route("owner/task/list", "routes/owner/task/task.list.tsx")
  ]),
] satisfies RouteConfig;

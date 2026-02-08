import {
  type RouteConfig,
  route,
  index,
  layout,
} from "@react-router/dev/routes";

export default [
  layout("layouts/auth.layout.tsx", [
    index("routes/auth/login.staff.tsx"),
    route("/owner", "routes/auth/login.owner.tsx"),
    route("/verify-otp", "routes/auth/verify.otp.tsx"),
  ]),

  layout("layouts/owner.layout.tsx", [
    route("owner/staff/list", "routes/owner/staff/staff.list.tsx"),
    route("owner/task/list", "routes/owner/task/task.list.tsx")
  ]),
] satisfies RouteConfig;

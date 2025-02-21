import { TEMPLET_SCREEN_CONFIG } from "config/templeteScreenConfig";
import Icon from "@mui/material/Icon";
import { TempletesScreen } from "layouts/templetes/index";

export const SidebarTempleteRoutes = () => {
  const sidebarItems = Object.entries(TEMPLET_SCREEN_CONFIG).map(([key, config]) => ({
    id: key,
    label: config.header,
    icon: config.icon || "",
    icon: (
      <i className="material-icons" style={{ color: "white" }}>
        group
      </i>
    ),
  }));

  let routes = [];

  // for (let index = 0; index < sidebarItems.length; index++) {
  //   const element = sidebarItems[index];
  //   routes.push({
  //     type: "collapse",
  //     name: element.label,
  //     key: element.id,
  //     icon: <Icon fontSize="small">element.icon</Icon>,
  //     route: "/templete-screens/" + element.id,
  //     icon: (
  //       <i className="material-icons" style={{ color: "white" }}>
  //         group
  //       </i>
  //     ),
  //     component: <TempletesScreen />,
  //     addToRoute: false,
  //   });
  // }

  return routes;
};

import { Links } from "@/components/nav/nav-links";
import UiSideBar from "./side-bar";

type Props = {
  links?: Links;
  children: React.ReactNode;
  navAside?: boolean;
};

function UiLayout({ links, children, navAside }: Props) {
  return (
    <div className="container-fluid">
      {navAside ? (
        <div className="row">
          <div className="col-12 col-sm-12 col-md-12 col-lg-2 col-xl-1">
            <UiSideBar links={links ? links : []} />
          </div>
          <div className="col-12 col-sm-12 col-md-12 col-lg-10 col-xl-11">
            {children}
          </div>
        </div>
      ) : (
        <>{children}</>
      )}
    </div>
  );
}

export default UiLayout;

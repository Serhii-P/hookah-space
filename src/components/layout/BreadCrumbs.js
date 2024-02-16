import Link from "next/link";

const Breadcrumbs = ({ crumbs }) => {
  return (
    <div className="flex gap-2 items-start justify-center text-[11px]	font-semibold	tracking-wide	uppercase">
      {crumbs?.map((crumb, i) => {
        const isLastItem = i === crumbs.length - 1;
        if (!isLastItem) {
          return (
            <div key={i}>
              <Link
                href={crumb.path}
                className="text-white hover:text-slate-300	"
              >
                {crumb.label}
              </Link>
              <span>&nbsp; / </span>
            </div>
          );
        } else {
          return <span key={i}>{crumb.label}</span>;
        }
      })}
    </div>
  );
};
export default Breadcrumbs;

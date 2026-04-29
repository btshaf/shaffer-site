type HeaderRoute =
  | { kind: 'home' }
  | {
      kind: 'case-study';
      currentSlug: string;
      currentNumber: string;
      currentCompany: string;
      currentTitle: string;
    }
  | {
      kind: 'thoughts';
      currentSlug: string;
      currentTitle: string;
    };

interface HeaderBreadcrumbProps {
  route: HeaderRoute;
}

export default function HeaderBreadcrumb({ route }: HeaderBreadcrumbProps) {
  if (route.kind === 'home') {
    return null;
  }

  return (
    <div className="hidden lg:flex items-center gap-2 max-w-72">
      <span className="font-serif text-base text-text-subtle">/</span>
      <span 
        className="font-serif text-base text-text truncate"
        title={route.kind === 'case-study' ? route.currentTitle : route.currentTitle}
      >
        {route.kind === 'case-study' 
          ? `${route.currentNumber} · ${route.currentCompany}`
          : route.currentTitle
        }
      </span>
    </div>
  );
}
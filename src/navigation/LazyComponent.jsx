// import { Suspense, lazy } from "react";
// import Loading from "../components/loading/loading";

// const LazyComponent = ({ path }) => {
//   const LazyComponent = lazy(() => import(`../screens/${path}`));
//   return (
//     <Suspense fallback={<Loading />}>
//       <LazyComponent />
//     </Suspense>
//   );
// };

// export default LazyComponent;

import { Suspense, lazy } from "react";
import Loading from "../components/loading/loading";

const LazyComponent = ({ path }) => {
  try {
    const Component = lazy(() => import(`../screens/${path}`));
    return (
      <Suspense fallback={<Loading />}>
        <Component />
      </Suspense>
    );
  } catch (error) {
    console.error(`Failed to load component at path: ${path}`, error);
    return <div>Error loading component.</div>;
  }
};

export default LazyComponent;

import { Suspense, lazy } from "react";
import Loading from "../components/loading/loading";

const LazyComponent = ({ path }) => {
  const LazyComponent = lazy(() => import(`../screens/${path}`));
  return (
    <Suspense fallback={<Loading />}>
      <LazyComponent />
    </Suspense>
  );
};

export default LazyComponent;




import { useScrollToTop } from "@/hooks/use-scroll-to-top";

const ScrollToTop = () => {
  // This hook will scroll to top whenever the route changes
  useScrollToTop();
  
  return null;
};

export default ScrollToTop;

import { Carousel } from "./components/Carousel";
import { ExploreTopBook } from "./components/ExploreTopBooks";
import { Heros } from "./components/Heros";
import { MoreInfo } from "./components/MoreInfo";
export const HomePage = () => {
  return (
    <>
      <ExploreTopBook />
      <Carousel />
      <Heros />
      <MoreInfo />

    </>
  );
};
 
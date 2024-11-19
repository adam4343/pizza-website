import { Categories } from "@/components/shared/categories";
import { Container } from "@/components/shared/container";
import { Filter } from "@/components/shared/filter";
import { MainContent } from "@/components/shared/main-content";
import { ProductCard } from "@/components/shared/product-card";
import { ProductCardsGroup } from "@/components/shared/product-cards-group";

import { Title } from "@/components/shared/title";
import { TopBar } from "@/components/shared/topBar";

export default function Home() {
  return (
    <>
      <Container className="mt-5">
        <Title text="All pizza's" size="lg" className="font-extrabold pb-4" />
      </Container>
      <TopBar />

      <Container>
        <MainContent />
      </Container>
    </>
  );
}

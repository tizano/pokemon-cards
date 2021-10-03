import React from "react";
import CardList from '../components/CardList/CardList.component';
import Header from '../components/Header/Header.component';

function Home() {
  return (
    <section>
      <Header title="Liste des cartes Pokemon" />
      <CardList />
    </section>
  )
}

export default Home;

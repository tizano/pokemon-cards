import React from "react";
import Header from '../components/Header/Header.component';
import CardDetail from "../components/CardDetail/CardDetail.component";

function Detail() {
  return (
    <section>
      <Header title="Détail de la carte Pokemon" />
      <CardDetail />
    </section>
  )
}

export default Detail;

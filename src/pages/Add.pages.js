import React from "react";
import Header from '../components/Header/Header.component';
import CardForm from '../components/CardForm/CardForm.component';

function Add() {
  return (
    <section>
      <Header title="Ajout d'une carte Pokemon" />
      <CardForm action="add" label="Ajouter" />
    </section>
  )
}

export default Add;

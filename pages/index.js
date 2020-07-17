import Head from "next/head";
import MainTitle from "../components/common/mainTitle";
import NewRentForm from "../components/newRentForm";
import Section from "../components/section";
import fetch from "isomorphic-unfetch";

import React from "react";

const Home = ({ notes }) => {
  return (
    <>
      <Head>
        <title>Bike Rental</title>
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto:wght@300;400;500;700&display=swap"
          rel="stylesheet"
        ></link>
      </Head>
      <main>
        <div className="main-title">
          <MainTitle />
        </div>
        <div className="new-rent-form">
          <NewRentForm />
        </div>
        <div className="rent-user">
          <Section
            srcIcon={"/img/star_smile.svg"}
            textOfTitle={"Your rent"}
            generalSum={true}
            infoData={notes.filter((note) => note.isRented)}
            btnRent={false}
          />
        </div>
        <div className="availble-bicycles">
          <Section
            srcIcon={"/img/bicycle.svg"}
            textOfTitle={"Available bicycles"}
            generalAmount={true}
            infoData={notes.filter((note) => note.isRented === false)}
            btnRent={true}
            btnDelete={true}
          />
        </div>
      </main>
      <style jsx>{`
        main {
          max-width: 1288px;
          margin-left: auto;
          margin-right: auto;
          font-family: "Roboto", sans-serif;
          color: #505050;
        }
        .main-title {
          margin-top: 78px;
          margin-bottom: -6px;
        }
        .new-rent-form {
          margin-bottom: 53px;
        }
        .rent-user {
          margin-bottom: 60px;
        }
        .availble-bicycles {
          margin-bottom: 78px;
        }
      `}</style>
      <style jsx global>
        {`
          body {
            background: #f5f5f5;
          }
        `}
      </style>
    </>
  );
};
Home.getInitialProps = async () => {
  const res = await fetch("https://rent-bike.vercel.app/api/notes");
  const { data } = await res.json();
  return { notes: data };
};

export default Home;

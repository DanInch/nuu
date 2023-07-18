import MeetupList from "../components/meetups/MeetupList";
import { MongoClient } from "mongodb";
import Head from "next/head";

const HomePage = (props) => {
  return (
    <>
      <Head>
        <title>Title for my Title page</title>
        <meta name='description' content='The biggest hits on the Internet' />
      </Head>
      <MeetupList meetups={props.meetups} />
    </>
  );
};

/*
export function getServerSideProps(context) {
  // runs every time you request a page, takes time
  // can do serverside stuff here, including stuff that involves sensitive information that 
  // you never want on the client side, because this function will not send it.
  return {
    props: {
      meetups: DUMMY_MEETUPS
    }
  }
};
*/

export async function getStaticProps() {
  // runs when you build the project, is quicker
  // eg you can get data from a db or API, or anything else you want
  // this function runs during the build process, not on the server or client at run time
  // can have server side-code here
  // you must always return an object, typically with a 'props' property
  // can be async/await

  const client = await MongoClient.connect(
    "mongodb+srv://daninch:Spagh00ps@mindhorn0.pri4c8e.mongodb.net/"
  );

  const db = client.db();

  const meetupCollection = db.collection("meetups");

  const meetups = await meetupCollection.find().toArray();

  client.close();

  return {
    props: {
      meetups: meetups.map((meetup) => ({
        title: meetup.title,
        image: meetup.image,
        address: meetup.address,
        id: meetup._id.toString(),
      })),
    },
    revalidate: 10, // revalidates page every ten seconds as long as it is requested on server
  };
}

export default HomePage;

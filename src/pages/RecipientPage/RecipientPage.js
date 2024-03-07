/* eslint-disable */
import { useEffect, useState } from "react";
import { Navigate, useParams } from "react-router-dom";

import { fetchRecipient } from "../../components/api/recipientApis";
import CardListBackground from "../../components/MessageCardList/CardListBackground/CardListBackground";
import MessageCardList from "../../components/MessageCardList/MessageCardList";
import Nav from "../../components/common/Nav/Nav";
import RecipientInfoBar from "../../components/RecipientInfoBar/RecipientInfoBar";
import RecipientInfoBarSkeleton from "components/RecipientInfoBar/RecipientInfoBarSkeleton/RecipientInfoBarSkeleton";
import useAsync from "../../hooks/useAsync";

import styles from "./RecipientPage.module.css";

const RecipientPage = () => {
  const [recipient, setRecipient] = useState({});
  const { recipientId } = useParams();

  const [getRecipientPending, getRecipientError, getRecipientAsync] =
    useAsync(fetchRecipient);

  const loadRecipient = async (id) => {
    const RESPONSE = await getRecipientAsync(id);
    setRecipient(RESPONSE);
  };

  useEffect(() => {
    loadRecipient(recipientId);
  }, []);

  if (getRecipientError) {
    console.log(getRecipientError);
    return <Navigate to="/*" />;
  }

  const { backgroundColor, backgroundImageURL } = recipient;

  return (
    <>
      <div className={styles.FixPosition}>
        <Nav />
        {getRecipientPending ? (
          <RecipientInfoBarSkeleton />
        ) : (
          <RecipientInfoBar recipientData={recipient} />
        )}
      </div>
      <CardListBackground
        backgroundType={backgroundImageURL || backgroundColor}
      >
        <MessageCardList
          recipient={recipient}
          recipientId={recipientId}
          backgroundColor={backgroundColor}
          backgroundImageURL={backgroundImageURL}
        />
      </CardListBackground>
    </>
  );
};

export default RecipientPage;

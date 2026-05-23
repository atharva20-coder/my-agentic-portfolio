import { getTweet } from 'react-tweet/api';
import { Suspense } from 'react';
import {
  TweetSkeleton,
  EmbeddedTweet,
  TweetNotFound,
  type TweetProps,
} from 'react-tweet';
import './tweet.css';

function normalizeTweetEntities(tweet: any) {
  if (tweet?.entities) {
    tweet.entities.hashtags ??= [];
    tweet.entities.user_mentions ??= [];
    tweet.entities.urls ??= [];
    tweet.entities.symbols ??= [];
  }
  if (tweet?.quoted_tweet?.entities) {
    tweet.quoted_tweet.entities.hashtags ??= [];
    tweet.quoted_tweet.entities.user_mentions ??= [];
    tweet.quoted_tweet.entities.urls ??= [];
    tweet.quoted_tweet.entities.symbols ??= [];
  }
  return tweet;
}

const TweetContent = async ({ id, components, onError }: TweetProps) => {
  let error;
  const rawTweet = id
    ? await getTweet(id).catch((err) => {
        if (onError) {
          error = onError(err);
        } else {
          console.error(err);
          error = err;
        }
      })
    : undefined;

  const tweet = rawTweet ? normalizeTweetEntities(rawTweet) : undefined;

  if (!tweet) {
    const NotFound = components?.TweetNotFound || TweetNotFound;
    return <NotFound error={error} />;
  }

  return <EmbeddedTweet tweet={tweet} components={components} />;
};

export const ReactTweet = (props: TweetProps) => <TweetContent {...props} />;

export async function TweetComponent({ id }: { id: string }) {
  return (
    <div className="tweet my-6">
      <div className={`flex justify-center`}>
        {/* <Suspense fallback={<TweetSkeleton />}> */}
        <ReactTweet id={id} />
        {/* </Suspense> */}
      </div>
    </div>
  );
}
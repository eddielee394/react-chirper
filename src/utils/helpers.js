import moment from "moment";

/**
 * Format date
 * @example h:i A | mm/dd/yyyy
 * @param timestamp
 * @return {string}
 */
export function formatDate(timestamp) {
  const d = new Date(timestamp);

  const formattedDate = moment
    .utc(d)
    .local()
    .format("M/DD/YYYY");

  const formattedTime = moment
    .utc(timestamp)
    .local()
    .format("h:mm A");

  return formattedTime + " | " + formattedDate;
}

export function formatTweet(tweet, author, authUser, parentTweet) {
  const { id, likes, replies, text, timestamp } = tweet;
  const { name, avatarURL } = author;
  const formattedTimestamp = formatDate(timestamp);

  return {
    name,
    id,
    text,
    timestamp: formattedTimestamp,
    avatar: avatarURL,
    likes: likes.length,
    replies: replies.length,
    hasLiked: likes.includes(authUser),
    parent: !parentTweet
      ? null
      : {
          author: parentTweet.author,
          id: parentTweet.id
        }
  };
}

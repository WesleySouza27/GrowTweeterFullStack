// import React from 'react';
// import styled from 'styled-components';

// interface ProfileProps {
//   user: {
//     avatar: string | null;
//     nome: string;
//     username: string;
//   };
//   tweets: Array<{
//     id: string;
//     conteudo: string;
//     likes: number;
//   }>;
// }

// export function Profile({ user, tweets }: ProfileProps) {
//   return (
//     <ProfileContainer>
//       <ProfileHeader>
//         <Avatar src={user.avatar || '/default-avatar.png'} alt={`${user.nome}'s avatar`} />
//         <ProfileInfo>
//           <Name>{user.nome}</Name>
//           <Username>@{user.username}</Username>
//         </ProfileInfo>
//       </ProfileHeader>
//       <TweetsContainer>
//         {tweets.map((tweet) => (
//           <Tweet key={tweet.id}>
//             <TweetContent>{tweet.conteudo}</TweetContent>
//             <TweetLikes>{tweet.likes} curtidas</TweetLikes>
//           </Tweet>
//         ))}
//       </TweetsContainer>
//     </ProfileContainer>
//   );
// }
// growtweeter/src/interfaces/interface.ts
export interface Explore {
  subtitle: string;
  title: string;
}

export interface UsuarioInterface {
  id: string;
  nome: string;
  email: string;
  senha: string;
  avatar?: string;
  criadoEm: string;
  atualizadoEm: string;
}

export interface TweetInterface {
  id: string;
  descricao: string;
  tipo: string;
  usuarioId: string;
  criadoEm: string;
  atualizadoEm: string;
  usuario: UsuarioInterface;
  likes: Array<{
    id: string;
    usuarioId: string;
    tweetId: string;
  }>;
  replies: Array<{
    id: string;
    descricao: string;
    tipo: string;
    usuarioId: string;
    criadoEm: string;
    atualizadoEm: string;
    parentId: string;
  }>;
}

export interface ReplieInterface {
  id: string;
  descricao: string;
  tipo: string;
  usuarioId: string;
  criadoEm: string;
  atualizadoEm: string;
  parentId?: string;
  usuario: UsuarioInterface;
  likes: Likes[];
  replies: ReplieInterface[];
  avatar: string;
}

export interface Likes {
  id: string;
  usuarioId: string;
  tweetId: string;
}



// export interface TweetInterface {
//   id: string;
//   descricao: string;
//   tipo: string;
//   usuarioId: string;
//   criadoEm: string;
//   atualizadoEm: string;
//   parentId?: string;
//   usuario: UsuarioInterface;
//   likes: Likes[];
//   replies: ReplieInterface[];
//   avatar: string;
//   // Adicione outras propriedades conforme necessário (ex: imageUrl)
// }
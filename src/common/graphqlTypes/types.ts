export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Timestamp: any;
};

export type PageInput = {
  rows_per_page: Scalars['Float'];
  page: Scalars['Float'];
};

export type Query = {
   __typename?: 'Query';
  userList: Array<User>;
};


export type QueryUserListArgs = {
  userListInput: UserListInput;
};


export type User = {
   __typename?: 'User';
  id: Scalars['String'];
  name: Scalars['String'];
  createTime: Scalars['Timestamp'];
  updateTime?: Maybe<Scalars['Timestamp']>;
  isDelete: Scalars['Float'];
  password: Scalars['String'];
  type: Scalars['Float'];
  userInfo?: Maybe<UserInfo>;
};

export type UserInfo = {
   __typename?: 'UserInfo';
  id: Scalars['String'];
  name: Scalars['String'];
  createTime: Scalars['Timestamp'];
  updateTime: Scalars['Timestamp'];
  isDelete: Scalars['Float'];
  userId: Scalars['String'];
  phone: Scalars['String'];
  email: Scalars['String'];
};

export type UserListInput = {
  rows_per_page: Scalars['Float'];
  page: Scalars['Float'];
  name?: Maybe<Scalars['String']>;
};


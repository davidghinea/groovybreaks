export type accessTokenType = string | null;

export type UserDataType = {
  country: string;
  display_name: string;
  email: string;
  explicit_content: {
    filter_enabled: boolean;
    filter_locked: boolean;
  };
  external_urls: {
    spotify: string;
  };
  followers: {
    href: string | null;
    total: number;
  };
  href: string;
  id: string;
  images: Array<{
    url: string;
    height: number | null;
    width: number | null;
  }> | null;
  product: string;
  type: string;
  uri: string;
};

export type UserPlaylistsType = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Array<{
    collaborative: boolean;
    description: string | null;
    external_urls: {
      spotify: string;
    };
    href: string;
    id: string;
    images: Array<{
      url: string;
      height: number;
      width: number;
    }> | null;
    name: string;
    owner: {
      external_urls: {
        spotify: string;
      };
      followers: {
        href: string | null;
        total: number;
      };
      href: string;
      id: string;
      type: string;
      uri: string;
      display_name: string | null;
    };
    public: boolean;
    snapshot_id: string;
    tracks: {
      href: string | null;
      total: number;
    };
    type: string;
    uri: string;
  }>;
};

export type UserPlaylistType = {
  collaborative: boolean;
  description: string | null;
  external_urls: {
    spotify: string;
  };
  href: string;
  id: string;
  images: Array<{
    url: string;
    height: number;
    width: number;
  }> | null;
  name: string;
  owner: {
    external_urls: {
      spotify: string;
    };
    followers: {
      href: string | null;
      total: number;
    };
    href: string;
    id: string;
    type: string;
    uri: string;
    display_name: string | null;
  };
  public: boolean;
  snapshot_id: string;
  tracks: {
    href: string | null;
    total: number;
  };
  type: string;
  uri: string;
};

export type ApiError = {
  status: number;
  message: string;
};

// all the types i created above are made using the spotify docs
// https://developer.spotify.com/documentation/web-api

/*
    implementing type-safety was hell, please if you ever 
    start a project by yourself implement it as you go 
    so you don't have to go through this 
*/

export type SearchParamsType = { [key: string]: string | string[] | undefined };

export type playlistDataType = { name: string; id: string; image: string };

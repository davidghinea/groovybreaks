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

export type PlaylistItemsType = {
  href: string;
  limit: number;
  next: string | null;
  offset: number;
  previous: string | null;
  total: number;
  items: Array<{
    added_at: string;
    added_by: {
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
    };
    is_local: boolean;
    track: {
      album: {
        album_type: string;
        total_tracks: number;
        available_markets: string[];
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        images: Array<{
          url: string;
          height: number;
          width: number;
        }>;
        name: string;
        release_date: string;
        release_date_precision: string;
        restrictions?: {
          reason: string;
        } | null;
        type: string;
        uri: string;
        artists: Array<{
          external_urls: {
            spotify: string;
          };
          href: string;
          id: string;
          name: string;
          type: string;
          uri: string;
        }>;
      };
      artists: Array<{
        external_urls: {
          spotify: string;
        };
        href: string;
        id: string;
        name: string;
        type: string;
        uri: string;
      }>;
      available_markets: string[];
      disc_number: number;
      duration_ms: number;
      explicit: boolean;
      external_ids: {
        isrc?: string | null;
        ean?: string | null;
        upc?: string | null;
      };
      external_urls: {
        spotify: string;
      };
      href: string;
      id: string;
      is_playable?: boolean | null;
      linked_from?: Record<string, never>;
      restrictions?: {
        reason: string;
      } | null;
      name: string;
      popularity: number;
      preview_url?: string | null;
      track_number: number;
      type: string;
      uri: string;
      is_local: boolean;
    } | null;
  }>;
};

export class ApiError extends Error {
  status: number;

  constructor(status: number, message: string) {
    if (typeof status !== "number" || typeof message !== "string") {
      throw new TypeError("Invalid parameters for ApiError");
    }
    super(message);
    this.status = status;
    Object.setPrototypeOf(this, ApiError.prototype);
  }
}

// all the types i created above are made using the spotify docs
// https://developer.spotify.com/documentation/web-api

/*
    implementing type-safety was hell, please if you ever 
    start a project by yourself implement it as you go 
    so you don't have to go through this 
*/

export type SearchParamsType = { [key: string]: string | string[] | undefined };

export type playlistDataType = { name: string; id: string; image: string };

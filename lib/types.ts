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

export type AvailableDevices = {
  devices: Array<{
    id: string | null;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number | null;
    supports_volume: boolean;
  }>;
};

export type PlaybackType = {
  device: {
    id: string | null;
    is_active: boolean;
    is_private_session: boolean;
    is_restricted: boolean;
    name: string;
    type: string;
    volume_percent: number | null;
    supports_volume: boolean;
  };
  repeat_state: string;
  shuffle_state: boolean;
  context: {
    type: string;
    href: string;
    external_urls: {
      spotify: string;
    };
    uri: string;
  } | null;
  timestamp: number;
  progress_ms: number;
  is_playing: boolean;
  item: {
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
  currently_playing_type: string;
  actions: {
    interrupting_playback: boolean;
    pausing: boolean;
    resuming: boolean;
    seeking: boolean;
    skipping_next: boolean;
    skipping_prev: boolean;
    toggling_repeat_context: boolean;
    toggling_shuffle: boolean;
    toggling_repeat_track: boolean;
    transferring_playback: boolean;
  };
};

export type currentlyPlayingType = {
  progress_ms: number | null;
  albumImage: string;
  artistName: string;
  duration_ms: number;
  trackName: string;
};

export class ApiError extends Error {
  constructor(status: number, message: string) {
    super(`${status}|s:m|${message}`);
    this.name = "ApiError";
  }
}
/*
  (*)

    The syntax |s:m| is used to split the status from the message. It's just a notation to help
    distinguish an ApiError from a normal error only with the message string of the error.

    For example: As the error gets passed to the error.tsx file it loses the ApiError type and
    the status propriety - due to serialization.

  (*)
*/
export type SearchParamsType = { [key: string]: string | string[] | undefined };

export type playlistDataType = { name: string; id: string; image: string };

// all the types i created above are made using the spotify docs
// https://developer.spotify.com/documentation/web-api

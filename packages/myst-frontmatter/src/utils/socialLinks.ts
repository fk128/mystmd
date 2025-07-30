import type { ValidationOptions } from 'simple-validators';
import {
  defined,
  incrementOptions,
  validateObjectKeys,
  validateString,
  validateUrl,
} from 'simple-validators';

export interface SocialLinks {
  url?: string;
  github?: string;
  bluesky?: string;
  mastodon?: string;
  linkedin?: string;
  threads?: string;
  twitter?: string; // Change to 'x' in future
}

export const SOCIAL_LINKS_KEYS = [
  'url',
  'github',
  'bluesky',
  'mastodon',
  'linkedin',
  'threads',
  'twitter', // Change to 'x' in future
];

export const SOCIAL_LINKS_ALIASES = {
  website: 'url',
  x: 'twitter', // Can change this in a future release to be the other way
  bsky: 'bluesky',
  instagram: 'threads', // This is the same username
};

export function validateSocialLinks(
  input: any,
  opts: ValidationOptions,
  output: SocialLinks = {},
): SocialLinks | undefined {
  const value = output
    ? input
    : validateObjectKeys(input, { optional: SOCIAL_LINKS_KEYS, alias: SOCIAL_LINKS_ALIASES }, opts);

  if (defined(value.url)) {
    output.url = validateUrl(value.url, incrementOptions('url', opts));
  }
  if (defined(value.github)) {
    output.github = validateString(value.github, incrementOptions('github', opts));
  }
  if (defined(value.bluesky)) {
    output.bluesky = validateString(value.bluesky, incrementOptions('bluesky', opts));
  }
  if (defined(value.mastodon)) {
    output.mastodon = validateString(value.mastodon, incrementOptions('mastodon', opts));
  }
  if (defined(value.linkedin)) {
    output.linkedin = validateUrl(value.linkedin, incrementOptions('linkedin', opts));
  }
  if (defined(value.threads)) {
    output.threads = validateString(value.threads, incrementOptions('threads', opts));
  }
  if (defined(value.twitter)) {
    output.twitter = validateString(value.twitter, incrementOptions('twitter', opts));
  }
  return output;
}

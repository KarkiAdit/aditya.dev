/** Public GitHub REST types used by the homepage dashboard (build + client). */

export type GithubDashboardUser = {
  login: string;
  name: string | null;
  avatarUrl: string;
  profileUrl: string;
  bio: string | null;
  publicRepos: number;
  followers: number;
};

export type GithubDashboardRepo = {
  id: number;
  name: string;
  htmlUrl: string;
  description: string | null;
  stars: number;
  /** Commits authored by you on the default branch (GraphQL); 0 if unknown. */
  commitCount: number;
  language: string | null;
  updatedAt: string;
  topics: readonly string[];
};

export type GithubDashboardData = {
  user: GithubDashboardUser;
  repos: readonly GithubDashboardRepo[];
  /** Merged language bytes across sampled repositories, sorted descending. */
  languageUsage: readonly { name: string; bytes: number }[];
  /** repo id → language → bytes (for filtering). */
  repoLanguages: Readonly<Record<string, Readonly<Record<string, number>>>>;
};

export type GithubDashboardResult =
  | { ok: true; data: GithubDashboardData }
  | { ok: false; error: string };

/** Dominant `/languages` labels used for quotas and the language bar (bytes merged for these only). */
export const DASHBOARD_FOCUS_LANGUAGES = ["Swift", "TypeScript", "Python", "C"] as const;

const DASHBOARD_REPO_LIMIT = 6;
const GRAPHQL_REPOS_FIRST = 100;

type EnrichedRepo = {
  repo: GithubDashboardRepo;
  map: Record<string, number>;
  dominant: string | null;
};

function sortByUpdatedDesc(a: EnrichedRepo, b: EnrichedRepo): number {
  return new Date(b.repo.updatedAt).getTime() - new Date(a.repo.updatedAt).getTime();
}

function reorderForDisplay(items: readonly EnrichedRepo[]): EnrichedRepo[] {
  const tier = (dom: string | null): number => {
    switch (dom) {
      case "Swift":
        return 0;
      case "TypeScript":
        return 1;
      case "Python":
        return 2;
      case "C":
        return 3;
      default:
        return 99;
    }
  };
  return [...items].sort((a, b) => {
    const t = tier(a.dominant) - tier(b.dominant);
    if (t !== 0) return t;
    return sortByUpdatedDesc(a, b);
  });
}

/**
 * Six repos: ≥2 Swift, ≥2 TypeScript, ≥1 Python, ≥1 C by most recent push, then fill to six from the same
 * four dominants if quotas leave gaps. Display order: all Swift, then TypeScript, then Python, then C
 * (newest first within each group).
 */
function pickDashboardRepos(enrichedAll: readonly EnrichedRepo[]): EnrichedRepo[] {
  const swifts = enrichedAll.filter((e) => e.dominant === "Swift").sort(sortByUpdatedDesc);
  const tss = enrichedAll.filter((e) => e.dominant === "TypeScript").sort(sortByUpdatedDesc);
  const pys = enrichedAll.filter((e) => e.dominant === "Python").sort(sortByUpdatedDesc);
  const cs = enrichedAll.filter((e) => e.dominant === "C").sort(sortByUpdatedDesc);

  const used = new Set<number>();
  const take = (arr: readonly EnrichedRepo[], cap: number): EnrichedRepo[] => {
    const out: EnrichedRepo[] = [];
    for (const e of arr) {
      if (out.length >= cap) break;
      if (used.has(e.repo.id)) continue;
      used.add(e.repo.id);
      out.push(e);
    }
    return out;
  };

  const parts: EnrichedRepo[] = [
    ...take(swifts, 2),
    ...take(tss, 2),
    ...take(pys, 1),
    ...take(cs, 1),
  ];

  const eligiblePool = enrichedAll
    .filter(
      (e) =>
        e.dominant === "Swift" ||
        e.dominant === "TypeScript" ||
        e.dominant === "Python" ||
        e.dominant === "C",
    )
    .sort(sortByUpdatedDesc);

  while (parts.length < DASHBOARD_REPO_LIMIT) {
    const next = eligiblePool.find((e) => !used.has(e.repo.id));
    if (next === undefined) break;
    used.add(next.repo.id);
    parts.push(next);
  }

  return reorderForDisplay(parts).slice(0, DASHBOARD_REPO_LIMIT);
}

/**
 * Deterministic placeholder when `PUBLIC_GITHUB_LOGIN` is unset or the API fails at build time.
 * Keeps the dashboard layout populated (not empty error UI).
 */
export const DEMO_GITHUB_DASHBOARD_DATA: GithubDashboardData = {
  user: {
    login: "preview",
    name: "Your name here",
    avatarUrl: "",
    profileUrl: "https://github.com",
    bio: "Set PUBLIC_GITHUB_LOGIN (and optionally GITHUB_TOKEN) so this section shows your real public GitHub profile at build time.",
    publicRepos: 38,
    followers: 214,
  },
  repos: [
    {
      id: 9005,
      name: "ios-dayflow",
      htmlUrl: "https://github.com/topics/swift",
      description: "SwiftUI journaling flow with local-first storage and gentle motion.",
      stars: 11,
      commitCount: 72,
      language: "Swift",
      updatedAt: "2026-04-15T12:00:00Z",
      topics: ["swift", "swiftui"],
    },
    {
      id: 9010,
      name: "swift-concurrency-lab",
      htmlUrl: "https://github.com/topics/swift",
      description: "Structured concurrency experiments and actor isolation notes.",
      stars: 8,
      commitCount: 54,
      language: "Swift",
      updatedAt: "2026-04-08T10:00:00Z",
      topics: ["swift", "concurrency"],
    },
    {
      id: 9001,
      name: "astro-portfolio",
      htmlUrl: "https://github.com/topics/astro",
      description: "Content-first site with MDX, sharp typography, and warm glass UI.",
      stars: 42,
      commitCount: 312,
      language: "TypeScript",
      updatedAt: "2026-04-01T15:00:00Z",
      topics: ["astro", "tailwind", "mdx"],
    },
    {
      id: 9002,
      name: "edge-cache-kit",
      htmlUrl: "https://github.com/topics/typescript",
      description: "Small utilities for cache headers, stale-while-revalidate, and observability.",
      stars: 28,
      commitCount: 198,
      language: "TypeScript",
      updatedAt: "2026-03-20T09:00:00Z",
      topics: ["typescript", "edge"],
    },
    {
      id: 9004,
      name: "lambda-notebook",
      htmlUrl: "https://github.com/topics/python",
      description: "Scheduled jobs and glue scripts for data hygiene and alerts.",
      stars: 14,
      commitCount: 94,
      language: "Python",
      updatedAt: "2026-02-10T18:00:00Z",
      topics: ["python", "aws"],
    },
    {
      id: 9011,
      name: "embedded-hal-playground",
      htmlUrl: "https://github.com/topics/c",
      description: "Small firmware experiments and C drivers for hobby boards.",
      stars: 6,
      commitCount: 41,
      language: "C",
      updatedAt: "2026-01-22T11:00:00Z",
      topics: ["c", "embedded"],
    },
  ],
  languageUsage: [
    { name: "TypeScript", bytes: 670_000 },
    { name: "Swift", bytes: 210_000 },
    { name: "Python", bytes: 124_000 },
    { name: "C", bytes: 52_000 },
  ],
  repoLanguages: {
    "9005": { Swift: 98000, JSON: 20000 },
    "9010": { Swift: 112000, Markdown: 8000 },
    "9001": { TypeScript: 380000, CSS: 80000, MDX: 52000 },
    "9002": { TypeScript: 290000, Shell: 22000 },
    "9004": { Python: 124000 },
    "9011": { C: 52000, Makefile: 3100 },
  },
};

type GhUserResponse = {
  login: string;
  name: string | null;
  avatar_url: string;
  html_url: string;
  bio: string | null;
  public_repos: number;
  followers: number;
  /** GraphQL node id (e.g. `MDQ6VXNlcjE=`) — used to count commits per repo. */
  node_id: string;
};

type GhRepoResponse = {
  id: number;
  name: string;
  html_url: string;
  description: string | null;
  stargazers_count: number;
  fork: boolean;
  language: string | null;
  languages_url: string;
  updated_at: string;
  topics?: string[];
};

function ghHeaders(token?: string): HeadersInit {
  return {
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "adityakarki.me-portfolio",
    ...(token && token.length > 0 ? { Authorization: `Bearer ${token}` } : {}),
  };
}

async function readJson<T>(res: Response): Promise<T> {
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`${String(res.status)} ${res.statusText}${text ? `: ${text.slice(0, 120)}` : ""}`);
  }
  return res.json() as Promise<T>;
}

const DASHBOARD_REPOS_GQL = `
  query DashboardRepos($login: String!, $authorId: ID!) {
    user(login: $login) {
      repositories(
        first: ${GRAPHQL_REPOS_FIRST}
        ownerAffiliations: OWNER
        isFork: false
        orderBy: { field: PUSHED_AT, direction: DESC }
      ) {
        nodes {
          databaseId
          name
          url
          description
          stargazerCount
          updatedAt
          primaryLanguage {
            name
          }
          repositoryTopics(first: 10) {
            nodes {
              topic {
                name
              }
            }
          }
          defaultBranchRef {
            target {
              ... on Commit {
                history(author: { id: $authorId }) {
                  totalCount
                }
              }
            }
          }
        }
      }
    }
  }
`;

type GraphqlRepoNode = {
  databaseId: number;
  name: string;
  url: string;
  description: string | null;
  stargazerCount: number;
  updatedAt: string;
  primaryLanguage: { name: string } | null;
  repositoryTopics: { nodes: { topic: { name: string } }[] };
  defaultBranchRef: {
    target: { history?: { totalCount: number } } | null;
  } | null;
};

type GraphqlReposPayload = {
  data?: {
    user: {
      repositories: { nodes: GraphqlRepoNode[] };
    } | null;
  };
  errors?: readonly { message: string }[];
};

function authorCommitsOnDefaultBranch(node: GraphqlRepoNode): number {
  const history = node.defaultBranchRef?.target?.history;
  return typeof history?.totalCount === "number" ? history.totalCount : 0;
}

function dominantLanguageName(map: Record<string, number>): string | null {
  let best: string | null = null;
  let max = -1;
  for (const [name, bytes] of Object.entries(map)) {
    if (bytes > max) {
      max = bytes;
      best = name;
    }
  }
  return best;
}

async function fetchOwnedRepoNodesGraphql(
  login: string,
  authorNodeId: string,
  headers: HeadersInit,
): Promise<GraphqlRepoNode[] | null> {
  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      ...headers,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query: DASHBOARD_REPOS_GQL,
      variables: { login, authorId: authorNodeId },
    }),
  });

  if (!res.ok) {
    return null;
  }

  const body = (await res.json()) as GraphqlReposPayload;
  if (body.errors !== undefined && body.errors.length > 0) {
    return null;
  }

  const nodes = body.data?.user?.repositories?.nodes;
  if (!Array.isArray(nodes)) {
    return null;
  }

  return [...nodes].sort((a, b) => {
    const d = authorCommitsOnDefaultBranch(b) - authorCommitsOnDefaultBranch(a);
    if (d !== 0) return d;
    return new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime();
  });
}

async function fetchReposRestFallback(login: string, headers: HeadersInit): Promise<GhRepoResponse[]> {
  const reposRes = await fetch(
    `https://api.github.com/users/${encodeURIComponent(login)}/repos?per_page=100&sort=pushed&type=owner`,
    { headers },
  );
  const reposJson = await readJson<GhRepoResponse[]>(reposRes);
  return reposJson.filter((r) => !r.fork);
}

/**
 * Fetches profile, then **six** owned repos (when available): ≥2 Swift, ≥2 TypeScript, ≥1 Python, ≥1 C
 * by most recent `updatedAt`, then any shortfall filled from those same dominants. Display order is Swift,
 * then TypeScript, then Python, then C (newest first within each). GraphQL supplies author commit counts
 * when possible. **Astro build** only.
 */
export async function fetchGithubDashboard(login: string, token?: string): Promise<GithubDashboardResult> {
  const trimmed = login.trim();
  if (!trimmed) {
    return { ok: false, error: "GitHub username is empty." };
  }

  const headers = ghHeaders(token);

  try {
    const userRes = await fetch(`https://api.github.com/users/${encodeURIComponent(trimmed)}`, { headers });
    const userJson = await readJson<GhUserResponse>(userRes);

    let candidates: GithubDashboardRepo[];

    const nodeId = userJson.node_id;
    const graphqlRepos =
      typeof nodeId === "string" && nodeId.length > 0
        ? await fetchOwnedRepoNodesGraphql(trimmed, nodeId, headers)
        : null;

    if (graphqlRepos !== null && graphqlRepos.length > 0) {
      candidates = graphqlRepos.map((n) => ({
        id: n.databaseId,
        name: n.name,
        htmlUrl: n.url,
        description: n.description,
        stars: n.stargazerCount,
        commitCount: authorCommitsOnDefaultBranch(n),
        language: n.primaryLanguage?.name ?? null,
        updatedAt: n.updatedAt,
        topics: n.repositoryTopics.nodes.map((x) => x.topic.name),
      }));
    } else {
      const owned = await fetchReposRestFallback(trimmed, headers);
      candidates = owned.map((r) => ({
        id: r.id,
        name: r.name,
        htmlUrl: r.html_url,
        description: r.description,
        stars: r.stargazers_count,
        commitCount: 0,
        language: r.language,
        updatedAt: r.updated_at,
        topics: r.topics ?? [],
      }));
    }

    const langMaps = await Promise.all(
      candidates.map(async (r) => {
        const url = `https://api.github.com/repos/${encodeURIComponent(trimmed)}/${encodeURIComponent(r.name)}/languages`;
        const lr = await fetch(url, { headers });
        const map = await readJson<Record<string, number>>(lr);
        return { repo: r, map };
      }),
    );

    const enrichedAll: EnrichedRepo[] = [];
    for (const { repo, map } of langMaps) {
      let m = map;
      if (Object.keys(m).length === 0 && repo.language) {
        m = { [repo.language]: 1 };
      }
      enrichedAll.push({
        repo,
        map: m,
        dominant: dominantLanguageName(m),
      });
    }

    const picked = pickDashboardRepos(enrichedAll);
    const topSix: GithubDashboardRepo[] = picked.map(({ repo, map }) => {
      const dom = dominantLanguageName(map);
      return {
        ...repo,
        language: dom ?? repo.language,
      };
    });

    const repoLanguages: Record<string, Record<string, number>> = {};
    const mergedFocus: Record<string, number> = {};
    for (const { repo, map } of picked) {
      repoLanguages[String(repo.id)] = map;
      for (const lang of DASHBOARD_FOCUS_LANGUAGES) {
        const b = map[lang];
        if (b !== undefined && b > 0) {
          mergedFocus[lang] = (mergedFocus[lang] ?? 0) + b;
        }
      }
    }

    const languageUsage = Object.entries(mergedFocus)
      .map(([name, bytes]) => ({ name, bytes }))
      .sort((a, b) => b.bytes - a.bytes);

    const data: GithubDashboardData = {
      user: {
        login: userJson.login,
        name: userJson.name,
        avatarUrl: userJson.avatar_url,
        profileUrl: userJson.html_url,
        bio: userJson.bio,
        publicRepos: userJson.public_repos,
        followers: userJson.followers,
      },
      repos: topSix,
      languageUsage,
      repoLanguages,
    };

    return { ok: true, data };
  } catch (e) {
    const message = e instanceof Error ? e.message : "Unknown error loading GitHub data.";
    return { ok: false, error: message };
  }
}

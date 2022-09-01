export const QUERY_STATS = `
query get_uptimestats{
  uptimestats {
    branch
    trending
    stats
    updated_at
  }
}
`;
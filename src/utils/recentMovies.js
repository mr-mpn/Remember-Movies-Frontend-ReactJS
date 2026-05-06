const STORAGE_KEY = 'cl_recent'
const MAX_RECENT = 5

/**
 * Get the list of recently searched movies from localStorage.
 */
export const getRecentMovies = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? JSON.parse(stored) : []
  } catch {
    return []
  }
}

/**
 * Add a movie to the recent list.
 * Deduplicates by imdbID and caps at MAX_RECENT entries.
 */
export const addRecentMovie = (movie) => {
  if (!movie || !movie.imdbID) return

  const recent = getRecentMovies()

  // Remove duplicate if exists
  const filtered = recent.filter((m) => m.imdbID !== movie.imdbID)

  // Add to front (full movie object)
  filtered.unshift(movie)

  // Cap at max
  const capped = filtered.slice(0, MAX_RECENT)

  localStorage.setItem(STORAGE_KEY, JSON.stringify(capped))
}

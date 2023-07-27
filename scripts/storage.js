export function saveSessionData(session) {
    const sessions = getStoredsessions()
    const sessionsUpdated = [...sessions, session]
    saveSession(sessionsUpdated)
}

function saveSession(sessions) {
    localStorage.setItem('typingSessions', JSON.stringify(sessions))
}

export function getStoredsessions() {

    const sessionStored = localStorage.getItem('typingSessions')
    if (!sessionStored) return []
    const sessionParsed = JSON.parse(sessionStored)
    if (!sessionParsed) return []
    return sessionParsed

}
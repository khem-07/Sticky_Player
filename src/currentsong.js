// Next.js API Route or Node handler
export default async function handler(req, res) {
  // This URL should return the raw song info as "Artist - Title"
  const url = 'http://c.surilive.com:8270/currentsong?sid=1';
  try {
    const response = await fetch(url);
    const text = await response.text();
    const trimmed = text.trim();

    if (!trimmed || trimmed.toLowerCase() === "error" || trimmed.toLowerCase() === "no stream found") {
      res.status(200).json({ success: false, artist: "", title: "", raw: trimmed, error: "No Title." });
      return;
    }

    let artist = "Ramasha Media", title = trimmed;
    if (trimmed.includes(" - ")) {
      [artist, title] = trimmed.split(" - ", 2);
    }

    res.status(200).json({ success: true, artist, title, raw: trimmed });
  } catch (e) {
    res.status(200).json({ success: false, artist: "", title: "", raw: "", error: "Error Loading." });
  }
}
export async function GET(request) {
  const url = 'http://c.surilive.com:8270/currentsong?sid=1';
  try {
    const response = await fetch(url);
    const text = await response.text();
    const trimmed = text.trim();

    if (!trimmed || trimmed.toLowerCase() === "error" || trimmed.toLowerCase() === "no stream found") {
      return Response.json({ success: false, artist: "", title: "", raw: trimmed, error: "No Title." });
    }

    let artist = "Ramasha Media", title = trimmed;
    if (trimmed.includes(" - ")) {
      [artist, title] = trimmed.split(" - ", 2);
    }

    return Response.json({ success: true, artist, title, raw: trimmed });
  } catch (e) {
    return Response.json({ success: false, artist: "", title: "", raw: "", error: "Error Loading." });
  }
}
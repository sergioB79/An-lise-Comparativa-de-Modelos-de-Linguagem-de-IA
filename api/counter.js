export default async function handler(req, res) {
  const increment = req.query.increment !== "0";
  const endpoint = increment
    ? "https://api.countapi.xyz/hit/ai-comparison-study/visits"
    : "https://api.countapi.xyz/get/ai-comparison-study/visits";

  try {
    const resp = await fetch(endpoint);

    if (!resp.ok) {
      const text = await resp.text();
      res.status(500).json({ error: "CountAPI request failed", detail: text });
      return;
    }

    const data = await resp.json();
    const value = data.result ?? 0;
    res.setHeader("Cache-Control", "no-store");
    res.status(200).json({ value });
  } catch (err) {
    res.status(500).json({ error: "CountAPI request error" });
  }
}

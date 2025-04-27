export async function refineText(text: string, options: {
  style: string;
  tone: string;
  length: string;
}) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_SUPABASE_URL}/functions/v1/refine-text`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY}`,
        },
        body: JSON.stringify({
          text,
          ...options
        }),
      }
    );

    if (!response.ok) {
      const error = await response.json();
      throw new Error(error.error || "Failed to refine text");
    }

    const data = await response.json();
    return data.refinedText;
  } catch (error) {
    console.error("Error refining text:", error);
    throw error;
  }
}
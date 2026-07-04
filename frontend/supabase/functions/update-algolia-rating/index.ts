import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase({ auth: "none" }, async (req) => {
    try {
      const data = await req.json();

      const algoliaApiKey = Deno.env.get("x-algolia-api-key")!;
      const algoliaApplicationKey = Deno.env.get("x-algolia-application-id")!;

      fetch(
        "https://data.eu.algolia.com/2/tasks/7e91d236-495e-4bad-bd9e-7f2292badc15/run",
        {
          method: "POST",
          headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "x-algolia-api-key": algoliaApiKey,
            "x-algolia-application-id": algoliaApplicationKey,
          },
          body:
            `{"runMetadata": {"avg_rating": ${data.record.avg_rating}, "book_id": ${data.record.book_id}, "review_count": ${data.record.review_count}}`,
        },
      );

      return Response.json({
        message: "Success",
      });
    } catch (error) {
      return Response.json({ message: error });
    }
  }),
};

/* To invoke locally:

  1. Run `supabase start` (see: https://supabase.com/docs/reference/cli/supabase-start)
  2. Make an HTTP request:

  curl.exe -i --location --request POST 'http://127.0.0.1:54321/functions/v1/update-algolia-rating' \
    --header 'apiKey: sb_publishable_ACJWlzQHlZjBrEguHvfOxg_3BJgxAaH' \
    --data '{/"name/":/"Functions/"}'

*/

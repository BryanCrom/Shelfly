import "@supabase/functions-js/edge-runtime.d.ts";
import { withSupabase } from "@supabase/server";

export default {
  fetch: withSupabase({ auth: "none" }, async () => {
    try {
      const algoliaApiKey = Deno.env.get("ALGOLIA_WRITE_KEY")!;
      const algoliaApplicationId = Deno.env.get("ALGOLIA_APPLICATION_ID")!;

      await fetch(
        "https://data.eu.algolia.com/2/tasks/7e91d236-495e-4bad-bd9e-7f2292badc15/run",
        {
          method: "POST",
          headers: {
            "accept": "application/json",
            "content-type": "application/json",
            "x-algolia-api-key": algoliaApiKey,
            "x-algolia-application-id": algoliaApplicationId,
          },
          body: "",
        },
      );

      return Response.json({
        message: "success",
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

const endpoint = "http://127.0.0.1:8000/care-queue?limit=100&offset=10";

async function main(): Promise<void> {
  const response = await fetch(endpoint);

  if (!response.ok) {
    throw new Error(
      `GET ${endpoint} failed: ${response.status} ${response.statusText}`,
    );
  }

  const data: unknown = await response.json();
  console.log(JSON.stringify(data, null, 2));
}

main().catch((error: unknown) => {
  console.error(error);
  throw error;
});
# Day 6: Add patient encounter

The form collects the fields required by `POST /encounters`. The JavaScript
`Add_Encounter` submit handler calls the TypeScript `add_encounter` function.
It posts to `http://127.0.0.1:8000/encounters`, reads the returned
`encounter_id`, calls `GET /encounters/{encounter_id}`, and displays the GET
response. A success alert with the encounter ID and patient number appears
immediately after a successful POST; GET-by-ID verification follows
independently. The page also fetches `GET /encounters?limit=1000&offset=0` on load
and after adding or searching, then renders the returned records in the
encounters table. A created or searched record is included in the table even
if it falls outside the list endpoint's first page. Encounter IDs must be
unique; if the API reports a duplicate ID, choose another ID before submitting.

The search form also accepts an encounter ID and calls
`GET http://127.0.0.1:8000/encounters/{encounter_id}` directly. The returned
encounter is displayed in the same result area.

## Build the TypeScript client

Run these commands in this folder:

```powershell
npm install
npm run build
```

## Open the form

Start the API at `http://127.0.0.1:8000`, then serve this folder over HTTP.
For example, run this command in this folder:

```powershell
py -m http.server 5500
```

Open <http://127.0.0.1:5500/>. If the API does not already allow browser
requests from that origin, configure its CORS policy to allow
`http://127.0.0.1:5500`.

## Create `public/_redirects`

Create a new file at `public/_redirects` with the following single line:

```
/*    /index.html   200
```

### Note
This file is a Netlify-style SPA fallback convention and has no effect on Lovable's hosting (SPA routing is already handled automatically). Creating it is harmless and will be included in the build output under `dist/_redirects`, but it will not change any runtime behavior on preview or published URLs.

No other files will be modified.